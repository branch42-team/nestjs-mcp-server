/**
 * MCP Tool Definitions for Course Management
 *
 * Defines the schema for all course-related tools exposed via MCP protocol.
 */

export const COURSE_TOOLS = {
  list_courses: {
    name: 'list_courses',
    description:
      'List available courses. Returns all courses for admins, or only enrolled courses for regular users.',
    inputSchema: {
      type: 'object',
      properties: {
        limit: {
          type: 'number',
          description: 'Maximum number of courses to return',
          default: 10,
          minimum: 1,
          maximum: 100,
        },
        offset: {
          type: 'number',
          description: 'Number of courses to skip for pagination',
          default: 0,
          minimum: 0,
        },
      },
    },
  },

  search_courses: {
    name: 'search_courses',
    description:
      'Search for courses by title or description. Results are filtered based on user enrollment.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description:
            'Search query to match against course title and description',
        },
        limit: {
          type: 'number',
          description: 'Maximum number of results to return',
          default: 10,
          minimum: 1,
          maximum: 100,
        },
      },
      required: ['query'],
    },
  },

  get_course_details: {
    name: 'get_course_details',
    description:
      'Get detailed information about a specific course, including modules and lessons. Requires enrollment (except for admins).',
    inputSchema: {
      type: 'object',
      properties: {
        courseId: {
          type: 'string',
          description: 'UUID of the course to retrieve',
          pattern:
            '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
        },
      },
      required: ['courseId'],
    },
  },

  get_lesson_content: {
    name: 'get_lesson_content',
    description:
      'Get detailed content of a specific lesson. Requires enrollment in the course containing this lesson (except for admins).',
    inputSchema: {
      type: 'object',
      properties: {
        lessonId: {
          type: 'string',
          description: 'UUID of the lesson to retrieve',
          pattern:
            '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
        },
      },
      required: ['lessonId'],
    },
  },

  semantic_search: {
    name: 'semantic_search',
    description:
      'Perform semantic search across lesson content using embeddings. Returns relevant lesson chunks ranked by similarity. Results are filtered to enrolled courses only.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Natural language query to search for in lesson content',
        },
        courseId: {
          type: 'string',
          description: 'Optional: Limit search to a specific course',
          pattern:
            '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
        },
        limit: {
          type: 'number',
          description: 'Maximum number of results to return',
          default: 10,
          minimum: 1,
          maximum: 50,
        },
        minSimilarity: {
          type: 'number',
          description: 'Minimum similarity score (0-1) for results',
          default: 0.7,
          minimum: 0,
          maximum: 1,
        },
      },
      required: ['query'],
    },
  },

  find_similar_lessons: {
    name: 'find_similar_lessons',
    description:
      'Find lessons with similar content to a given lesson. Uses semantic similarity of lesson embeddings. Results are filtered to enrolled courses.',
    inputSchema: {
      type: 'object',
      properties: {
        lessonId: {
          type: 'string',
          description: 'UUID of the lesson to find similar content for',
          pattern:
            '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
        },
        limit: {
          type: 'number',
          description: 'Maximum number of similar lessons to return',
          default: 5,
          minimum: 1,
          maximum: 20,
        },
      },
      required: ['lessonId'],
    },
  },
} as const;

export type CourseToolName = keyof typeof COURSE_TOOLS;

// Type definitions for tool inputs
export interface ListCoursesInput {
  limit?: number;
  offset?: number;
}

export interface SearchCoursesInput {
  query: string;
  limit?: number;
}

export interface GetCourseDetailsInput {
  courseId: string;
}

export interface GetLessonContentInput {
  lessonId: string;
}

export interface SemanticSearchInput {
  query: string;
  courseId?: string;
  limit?: number;
  minSimilarity?: number;
}

export interface FindSimilarLessonsInput {
  lessonId: string;
  limit?: number;
}
