import { McpClient } from './client.js';
import { Formatter } from './formatter.js';

/**
 * Intelligent Agent for MCP Interactions
 *
 * Processes natural language queries and calls appropriate MCP tools.
 */
export class Agent {
  private client: McpClient;
  private context: Map<string, any> = new Map();

  constructor(client: McpClient) {
    this.client = client;
  }

  /**
   * Process a natural language query
   */
  async processQuery(query: string): Promise<string> {
    const lowerQuery = query.toLowerCase().trim();

    try {
      // List courses
      if (
        this.matchesPattern(lowerQuery, [
          'list courses',
          'show courses',
          'show me courses',
          'what courses',
          'my courses',
        ])
      ) {
        return await this.listCourses();
      }

      // Search courses
      if (
        lowerQuery.startsWith('search') ||
        lowerQuery.includes('find courses')
      ) {
        const searchTerm = this.extractSearchTerm(lowerQuery, [
          'search',
          'search for',
          'find courses about',
          'find courses on',
        ]);
        if (searchTerm) {
          return await this.searchCourses(searchTerm);
        }
      }

      // Get course details
      if (
        lowerQuery.includes('course details') ||
        lowerQuery.includes('tell me about course') ||
        lowerQuery.includes('show course')
      ) {
        const courseId = this.extractUuid(lowerQuery);
        if (courseId) {
          return await this.getCourseDetails(courseId);
        } else {
          return Formatter.formatError(
            'Please provide a course ID. You can get course IDs by listing courses first.',
          );
        }
      }

      // Get lesson content
      if (
        lowerQuery.includes('lesson') &&
        (lowerQuery.includes('show') ||
          lowerQuery.includes('get') ||
          lowerQuery.includes('what is'))
      ) {
        const lessonId = this.extractUuid(lowerQuery);
        if (lessonId) {
          return await this.getLessonContent(lessonId);
        } else {
          return Formatter.formatError(
            'Please provide a lesson ID. Get lesson IDs by viewing course details.',
          );
        }
      }

      // Semantic search
      if (
        lowerQuery.includes('find lessons about') ||
        lowerQuery.includes('search lessons') ||
        lowerQuery.includes('lessons about')
      ) {
        const searchTerm = this.extractSearchTerm(lowerQuery, [
          'find lessons about',
          'search lessons about',
          'lessons about',
          'search lessons for',
        ]);
        if (searchTerm) {
          return await this.semanticSearch(searchTerm);
        }
      }

      // Find similar lessons
      if (
        lowerQuery.includes('similar to') ||
        lowerQuery.includes('like lesson')
      ) {
        const lessonId = this.extractUuid(lowerQuery);
        if (lessonId) {
          return await this.findSimilarLessons(lessonId);
        } else {
          return Formatter.formatError(
            'Please provide a lesson ID to find similar lessons.',
          );
        }
      }

      // Help command
      if (lowerQuery === 'help' || lowerQuery === '?') {
        return this.showHelp();
      }

      // Default: semantic search if it's a question
      if (lowerQuery.includes('?') || lowerQuery.split(' ').length > 2) {
        return await this.semanticSearch(query);
      }

      return Formatter.formatError(
        `I don't understand that query. Type "help" for available commands.`,
      );
    } catch (error: any) {
      if (error.error) {
        return Formatter.formatError(error.error);
      }
      return Formatter.formatError(error);
    }
  }

  /**
   * List all courses
   */
  private async listCourses(): Promise<string> {
    const result = await this.client.callTool('list_courses', {
      limit: 20,
      offset: 0,
    });

    if (result.error) {
      return Formatter.formatError(result);
    }

    // Store courses in context
    if (result.courses) {
      result.courses.forEach((course: any, index: number) => {
        this.context.set(`course${index + 1}`, course.id);
      });
    }

    return Formatter.formatCourses(result.courses || []);
  }

  /**
   * Search courses by keyword
   */
  private async searchCourses(query: string): Promise<string> {
    const result = await this.client.callTool('search_courses', {
      query,
      limit: 10,
    });

    if (result.error) {
      return Formatter.formatError(result);
    }

    return Formatter.formatCourses(result.courses || []);
  }

  /**
   * Get course details
   */
  private async getCourseDetails(courseId: string): Promise<string> {
    const result = await this.client.callTool('get_course_details', {
      courseId,
    });

    if (result.error) {
      return Formatter.formatError(result);
    }

    return Formatter.formatCourseDetails(result);
  }

  /**
   * Get lesson content
   */
  private async getLessonContent(lessonId: string): Promise<string> {
    const result = await this.client.callTool('get_lesson_content', {
      lessonId,
    });

    if (result.error) {
      return Formatter.formatError(result);
    }

    return Formatter.formatLesson(result);
  }

  /**
   * Semantic search across lessons
   */
  private async semanticSearch(query: string): Promise<string> {
    const result = await this.client.callTool('semantic_search', {
      query,
      limit: 10,
      minSimilarity: 0.7,
    });

    if (result.error) {
      return Formatter.formatError(result);
    }

    return Formatter.formatSearchResults(result.results || []);
  }

  /**
   * Find similar lessons
   */
  private async findSimilarLessons(lessonId: string): Promise<string> {
    const result = await this.client.callTool('find_similar_lessons', {
      lessonId,
      limit: 5,
    });

    if (result.error) {
      return Formatter.formatError(result);
    }

    return Formatter.formatSearchResults(result.results || []);
  }

  /**
   * Show help message
   */
  private showHelp(): string {
    return `
${Formatter.formatInfo('Available Commands:')}

${' Course Management:'}
  • list courses              - List all your enrolled courses
  • search [term]             - Search courses by title/description
  • show course [id]          - Get detailed course information

${'  Lesson Management:'}
  • show lesson [id]          - Get lesson content
  • find lessons about [term] - Semantic search across lessons
  • similar to [lesson-id]    - Find similar lessons

${'  General:'}
  • help, ?                   - Show this help message
  • exit, quit                - Exit the CLI

${'  Examples:'}
  • list courses
  • search typescript
  • find lessons about variables
  • show course 123e4567-e89b-12d3-a456-426614174000
`;
  }

  /**
   * Check if query matches any pattern
   */
  private matchesPattern(query: string, patterns: string[]): boolean {
    return patterns.some((pattern) => query.includes(pattern));
  }

  /**
   * Extract search term from query
   */
  private extractSearchTerm(query: string, prefixes: string[]): string | null {
    for (const prefix of prefixes) {
      if (query.includes(prefix)) {
        return query.substring(query.indexOf(prefix) + prefix.length).trim();
      }
    }
    return null;
  }

  /**
   * Extract UUID from query
   */
  private extractUuid(query: string): string | null {
    const uuidRegex =
      /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
    const match = query.match(uuidRegex);
    return match ? match[0] : null;
  }
}
