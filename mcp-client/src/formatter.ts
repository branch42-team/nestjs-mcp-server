import chalk from 'chalk';

/**
 * Formatter for MCP responses
 *
 * Provides colorized, human-readable output for terminal display.
 */
export class Formatter {
  /**
   * Format a list of courses
   */
  static formatCourses(courses: any[]): string {
    if (courses.length === 0) {
      return chalk.yellow('No courses found.');
    }

    let output = chalk.bold.cyan(`\n📚 Found ${courses.length} course(s):\n\n`);

    courses.forEach((course, index) => {
      output += chalk.bold(`${index + 1}. ${course.title}\n`);
      output += chalk.gray(`   ID: ${course.id}\n`);
      output += `   ${this.truncate(course.description, 100)}\n`;
      output += chalk.dim(`   Duration: ${course.duration} minutes\n`);
      output += '\n';
    });

    return output;
  }

  /**
   * Format course details with modules and lessons
   */
  static formatCourseDetails(course: any): string {
    let output = chalk.bold.cyan(`\n📘 ${course.title}\n\n`);
    output += chalk.gray(`ID: ${course.id}\n`);
    output += `${course.description}\n`;
    output += chalk.dim(`Duration: ${course.duration} minutes\n\n`);

    if (course.modules && course.modules.length > 0) {
      output += chalk.bold.yellow(`📑 Modules (${course.modules.length}):\n\n`);

      course.modules.forEach((module: any, idx: number) => {
        output += chalk.bold(`  ${idx + 1}. ${module.title}\n`);
        output += chalk.gray(`     ID: ${module.id}\n`);
        if (module.description) {
          output += `     ${this.truncate(module.description, 80)}\n`;
        }

        if (module.lessons && module.lessons.length > 0) {
          output += chalk.dim(`     📝 ${module.lessons.length} lesson(s):\n`);
          module.lessons.forEach((lesson: any, lidx: number) => {
            output += chalk.dim(
              `       ${lidx + 1}. ${lesson.title} (${lesson.type})\n`,
            );
          });
        }
        output += '\n';
      });
    }

    return output;
  }

  /**
   * Format a single lesson
   */
  static formatLesson(lesson: any): string {
    let output = chalk.bold.cyan(`\n📝 ${lesson.title}\n\n`);
    output += chalk.gray(`ID: ${lesson.id}\n`);
    output += chalk.yellow(`Type: ${lesson.type}\n`);
    output += chalk.dim(`Duration: ${lesson.duration} minutes\n\n`);

    if (lesson.description) {
      output += chalk.bold('Description:\n');
      output += `${lesson.description}\n\n`;
    }

    if (lesson.content) {
      output += chalk.bold('Content:\n');
      output += `${this.truncate(lesson.content, 500)}\n\n`;
    }

    if (lesson.videoUrl) {
      output += chalk.blue(`Video: ${lesson.videoUrl}\n`);
    }

    if (lesson.documentUrl) {
      output += chalk.blue(`Document: ${lesson.documentUrl}\n`);
    }

    return output;
  }

  /**
   * Format semantic search results
   */
  static formatSearchResults(results: any[]): string {
    if (results.length === 0) {
      return chalk.yellow('No results found.');
    }

    let output = chalk.bold.cyan(`\n🔍 Found ${results.length} result(s):\n\n`);

    results.forEach((result, index) => {
      const similarity = (result.similarity * 100).toFixed(1);
      output += chalk.bold(
        `${index + 1}. ${result.lessonTitle || result.lesson?.title || 'Unknown'}\n`,
      );
      output += chalk.green(`   Similarity: ${similarity}%\n`);
      output += chalk.gray(`   Lesson ID: ${result.lessonId}\n`);
      output += `   ${this.truncate(result.chunkContent, 150)}\n`;
      output += '\n';
    });

    return output;
  }

  /**
   * Format error message
   */
  static formatError(error: any): string {
    let message = chalk.bold.red('\n❌ Error:\n');

    if (typeof error === 'string') {
      message += chalk.red(`${error}\n`);
    } else if (error.message) {
      message += chalk.red(`${error.message}\n`);
      if (error.status) {
        message += chalk.dim(`Status: ${error.status}\n`);
      }
    } else {
      message += chalk.red(`${JSON.stringify(error, null, 2)}\n`);
    }

    return message;
  }

  /**
   * Format success message
   */
  static formatSuccess(message: string): string {
    return chalk.bold.green(`\n✓ ${message}\n`);
  }

  /**
   * Format info message
   */
  static formatInfo(message: string): string {
    return chalk.bold.blue(`\nℹ ${message}\n`);
  }

  /**
   * Truncate text to specified length
   */
  private static truncate(text: string, maxLength: number): string {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  /**
   * Format a table
   */
  static formatTable(headers: string[], rows: string[][]): string {
    const colWidths = headers.map((h, i) => {
      const maxRowWidth = Math.max(...rows.map((r) => (r[i] || '').length));
      return Math.max(h.length, maxRowWidth);
    });

    let output = '\n';

    // Header
    output +=
      chalk.bold(headers.map((h, i) => h.padEnd(colWidths[i])).join(' │ ')) +
      '\n';

    // Separator
    output += colWidths.map((w) => '─'.repeat(w)).join('─┼─') + '\n';

    // Rows
    rows.forEach((row) => {
      output +=
        row.map((cell, i) => (cell || '').padEnd(colWidths[i])).join(' │ ') +
        '\n';
    });

    return output + '\n';
  }
}
