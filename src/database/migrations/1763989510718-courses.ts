import { MigrationInterface, QueryRunner } from 'typeorm';

export class Courses1763989510718 implements MigrationInterface {
  name = 'Courses1763989510718';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."enrollment_status_enum" AS ENUM(
                'enrolled',
                'in_progress',
                'completed',
                'suspended'
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "enrollment" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "userId" uuid NOT NULL,
                "courseId" uuid NOT NULL,
                "status" "public"."enrollment_status_enum" NOT NULL DEFAULT 'enrolled',
                "enrolledAt" TIMESTAMP NOT NULL DEFAULT now(),
                "completedAt" TIMESTAMP,
                "progressPercentage" integer NOT NULL DEFAULT '0',
                "metadata" jsonb,
                CONSTRAINT "UQ_bb8d5ae5e144676c88c0ebd3c19" UNIQUE ("userId", "courseId"),
                CONSTRAINT "PK_7e200c699fa93865cdcdd025885" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_e97ecbf11356b5173ce7fb0b06" ON "enrollment" ("userId")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_d1a599a7740b4f4bd1120850f0" ON "enrollment" ("courseId")
        `);
    await queryRunner.query(`
            CREATE TABLE "course" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "title" character varying NOT NULL,
                "description" text NOT NULL,
                "thumbnailUrl" text,
                "isActive" boolean NOT NULL DEFAULT true,
                "duration" integer NOT NULL DEFAULT '0',
                "metadata" jsonb,
                CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_ac5edecc1aefa58ed0237a7ee4" ON "course" ("title")
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."lesson_type_enum" AS ENUM('video', 'text', 'quiz', 'document')
        `);
    await queryRunner.query(`
            CREATE TABLE "lesson" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "title" character varying NOT NULL,
                "description" text,
                "type" "public"."lesson_type_enum" NOT NULL DEFAULT 'text',
                "content" text,
                "videoUrl" character varying,
                "documentUrl" character varying,
                "duration" integer NOT NULL DEFAULT '0',
                "orderIndex" integer NOT NULL DEFAULT '0',
                "isActive" boolean NOT NULL DEFAULT true,
                "metadata" jsonb,
                "moduleId" uuid NOT NULL,
                CONSTRAINT "PK_0ef25918f0237e68696dee455bd" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_19967be71e1113334304a55fa6" ON "lesson" ("title")
        `);
    await queryRunner.query(`
            CREATE TABLE "module" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "title" character varying NOT NULL,
                "description" text,
                "orderIndex" integer NOT NULL DEFAULT '0',
                "isActive" boolean NOT NULL DEFAULT true,
                "courseId" uuid NOT NULL,
                CONSTRAINT "PK_0e20d657f968b051e674fbe3117" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_b661ffc174296876dbd910ceb5" ON "module" ("title")
        `);
    await queryRunner.query(`
            ALTER TABLE "enrollment"
            ADD CONSTRAINT "FK_e97ecbf11356b5173ce7fb0b060" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "enrollment"
            ADD CONSTRAINT "FK_d1a599a7740b4f4bd1120850f04" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "lesson"
            ADD CONSTRAINT "FK_42a199a34cfc03ea90b4f552c1c" FOREIGN KEY ("moduleId") REFERENCES "module"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "module"
            ADD CONSTRAINT "FK_47d4039ae15a387ef27eccf3825" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "module" DROP CONSTRAINT "FK_47d4039ae15a387ef27eccf3825"
        `);
    await queryRunner.query(`
            ALTER TABLE "lesson" DROP CONSTRAINT "FK_42a199a34cfc03ea90b4f552c1c"
        `);
    await queryRunner.query(`
            ALTER TABLE "enrollment" DROP CONSTRAINT "FK_d1a599a7740b4f4bd1120850f04"
        `);
    await queryRunner.query(`
            ALTER TABLE "enrollment" DROP CONSTRAINT "FK_e97ecbf11356b5173ce7fb0b060"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_b661ffc174296876dbd910ceb5"
        `);
    await queryRunner.query(`
            DROP TABLE "module"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_19967be71e1113334304a55fa6"
        `);
    await queryRunner.query(`
            DROP TABLE "lesson"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."lesson_type_enum"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_ac5edecc1aefa58ed0237a7ee4"
        `);
    await queryRunner.query(`
            DROP TABLE "course"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_d1a599a7740b4f4bd1120850f0"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_e97ecbf11356b5173ce7fb0b06"
        `);
    await queryRunner.query(`
            DROP TABLE "enrollment"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."enrollment_status_enum"
        `);
  }
}
