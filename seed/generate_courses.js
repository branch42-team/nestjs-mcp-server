import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';
import { createWriteStream, writeFileSync } from 'fs';

// Configurable counts
const coursesCount = 3;
const modulesPerCourse = 3;
const lessonsPerModule = 3;

const esc = (s) => {
  if (s === null || s === undefined) return 'NULL';
  return `'${String(s).replace(/'/g, "''")}'`; // SQL escape '
};

const nowIso = () => new Date().toISOString();

function generateCourse(i) {
  return {
    id: randomUUID(),
    title: `${faker.word.adjective()} ${faker.word.noun()} Course ${i}`,
    description: faker.lorem.paragraphs(2),
    thumbnailUrl: `https://picsum.photos/seed/course${i}/800/450`,
    duration: Math.floor(Math.random() * 600) + 60,
    metadata: {
      domain: faker.helpers.arrayElement([
        'business',
        'design',
        'engineering',
        'marketing',
        'data',
      ]),
      level: faker.helpers.arrayElement([
        'beginner',
        'intermediate',
        'advanced',
      ]),
      keywords: faker.helpers.arrayElements(
        ['api', 'testing', 'ui', 'backend', 'performance', 'sql', 'cloud'],
        3,
      ),
    },
  };
}

function generateModule(course, idx) {
  return {
    id: randomUUID(),
    title: `${course.title} — Module ${idx}`,
    description: faker.lorem.paragraph(),
    orderIndex: idx - 1,
    courseId: course.id,
  };
}

function generateLesson(course, module, idx, globalIdx) {
  const type = faker.helpers.arrayElement([
    'video',
    'text',
    'quiz',
    'document',
  ]);
  const title = `${module.title} — Lesson ${idx}: ${faker.lorem.words(3)}`;

  const intro = faker.lorem.paragraphs(1);
  const body = faker.lorem.paragraphs(3);
  const codeExample = `\`\`\`js\nconsole.log("Example ${globalIdx}");\n\`\`\``;
  const conclusion = faker.lorem.paragraph();

  const fullText = [title, intro, body, codeExample, conclusion].join('\n\n');

  const metadata = {
    courseId: course.id,
    courseTitle: course.title,
    moduleId: module.id,
    moduleTitle: module.title,
    type,
    tags: faker.helpers.arrayElements(
      ['basics', 'api', 'examples', 'strategy'],
      2,
    ),
    embedding: null,
  };

  const id = randomUUID();
  metadata.lessonId = id;

  return {
    id,
    title,
    description: faker.lorem.sentence(),
    type,
    content: fullText,
    videoUrl:
      type === 'video'
        ? `https://videos.example.com/${randomUUID()}.mp4`
        : null,
    documentUrl:
      type === 'document'
        ? `https://docs.example.com/${randomUUID()}.pdf`
        : null,
    duration: Math.floor(Math.random() * 20) + 2,
    orderIndex: idx - 1,
    metadata,
    moduleId: module.id,
  };
}

// ---- Generate all data ----
const courses = [];
const modules = [];
const lessons = [];

for (let c = 1; c <= coursesCount; c++) {
  const course = generateCourse(c);
  courses.push(course);

  for (let m = 1; m <= modulesPerCourse; m++) {
    const mod = generateModule(course, m);
    modules.push(mod);

    for (let l = 1; l <= lessonsPerModule; l++) {
      const globalIdx = lessons.length + 1;
      const les = generateLesson(course, mod, l, globalIdx);
      lessons.push(les);
    }
  }
}

// ---- Build SQL ----
let sql = '-- seed_rag.sql (Bun)\n\n';

courses.forEach((c) => {
  sql += `INSERT INTO "public"."course" ("id","createdAt","updatedAt","title","description","thumbnailUrl","isActive","duration","metadata") VALUES (${esc(
    c.id,
  )}, ${esc(nowIso())}, ${esc(nowIso())}, ${esc(c.title)}, ${esc(c.description)}, ${esc(
    c.thumbnailUrl,
  )}, true, ${c.duration}, ${esc(JSON.stringify(c.metadata))});\n`;
});
sql += '\n';

modules.forEach((m) => {
  sql += `INSERT INTO "public"."module" ("id","createdAt","updatedAt","title","description","orderIndex","isActive","courseId") VALUES (${esc(
    m.id,
  )}, ${esc(nowIso())}, ${esc(nowIso())}, ${esc(m.title)}, ${esc(m.description)}, ${
    m.orderIndex
  }, true, ${esc(m.courseId)});\n`;
});
sql += '\n';

lessons.forEach((l) => {
  sql += `INSERT INTO "public"."lesson" ("id","createdAt","updatedAt","title","description","type","content","videoUrl","documentUrl","duration","orderIndex","isActive","metadata","moduleId") VALUES (${esc(
    l.id,
  )}, ${esc(nowIso())}, ${esc(nowIso())}, ${esc(l.title)}, ${esc(l.description)}, ${esc(
    l.type,
  )}, ${esc(l.content)}, ${l.videoUrl ? esc(l.videoUrl) : 'NULL'}, ${
    l.documentUrl ? esc(l.documentUrl) : 'NULL'
  }, ${l.duration}, ${l.orderIndex}, true, ${esc(
    JSON.stringify(l.metadata),
  )}, ${esc(l.moduleId)});\n`;
});

// Write SQL
writeFileSync('seed_rag.sql', sql, 'utf8');

// Write JSONL for embeddings
const jsonl = createWriteStream('lessons_for_embeddings.jsonl');
for (const l of lessons) {
  jsonl.write(
    JSON.stringify({ id: l.id, text: l.content, metadata: l.metadata }) + '\n',
  );
}
jsonl.end();

console.log('Generated:');
console.log(' - seed_rag.sql');
console.log(' - lessons_for_embeddings.jsonl');
console.log(
  `Courses: ${courses.length}, Modules: ${modules.length}, Lessons: ${lessons.length}`,
);
