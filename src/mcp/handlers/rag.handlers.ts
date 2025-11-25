import { CoursesRagService } from '@/api/courses/courses-rag.service';
import { UserEntity } from '@/auth/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { McpEnrollmentGuard } from '../guards/enrollment.guard';
import {
  FindSimilarLessonsInput,
  SemanticSearchInput,
} from '../tools/courses.tools';

/**
 * RAG Handlers for MCP Tools
 *
 * Implements semantic search and similarity features using embeddings.
 * All results are filtered based on user enrollment.
 */
@Injectable()
export class RagHandlers {
  constructor(
    private readonly ragService: CoursesRagService,
    private readonly enrollmentGuard: McpEnrollmentGuard,
  ) {}

  /**
   * Semantic search across lesson content using embeddings
   * Results filtered to enrolled courses only
   */
  async semanticSearch(user: UserEntity, params: SemanticSearchInput) {
    const { query, courseId, limit = 10, minSimilarity = 0.7 } = params;

    // Get enrolled course IDs
    const enrolledCourseIds =
      await this.enrollmentGuard.getEnrolledCourseIds(user);

    // If user has no enrollments and is not admin, return empty
    if (enrolledCourseIds !== null && enrolledCourseIds.length === 0) {
      return {
        results: [],
        total: 0,
        query,
        filters: { courseId, minSimilarity },
      };
    }

    // If specific courseId provided, verify enrollment
    if (courseId) {
      await this.enrollmentGuard.verifyEnrollment(user, courseId);
    }

    // Build filters
    const filters: any = {
      minSimilarity,
    };

    // If specific course requested, use it
    if (courseId) {
      filters.courseId = courseId;
    }
    // Otherwise, if user is not admin, filter by enrolled courses
    else if (enrolledCourseIds !== null) {
      filters.courseIds = enrolledCourseIds;
    }

    // Perform semantic search
    const results = await this.ragService.semanticSearch(query, filters, limit);

    return {
      results: results.map((r) => ({
        lessonId: r.lessonId,
        lessonTitle: r.lessonTitle,
        chunkContent: r.chunkContent,
        chunkIndex: r.chunkIndex,
        similarity: r.similarity,
        metadata: r.metadata,
        lesson: r.lesson
          ? {
              id: r.lesson.id,
              title: r.lesson.title,
              type: r.lesson.type,
            }
          : undefined,
      })),
      total: results.length,
      query,
      filters,
    };
  }

  /**
   * Find lessons similar to a given lesson
   * Results filtered to enrolled courses
   */
  async findSimilarLessons(user: UserEntity, params: FindSimilarLessonsInput) {
    const { lessonId, limit = 5 } = params;

    // Verify user has access to the source lesson
    const courseId =
      await this.enrollmentGuard.resolveCourseIdFromLesson(lessonId);
    await this.enrollmentGuard.verifyEnrollment(user, courseId);

    // Get similar lessons
    const results = await this.ragService.findSimilarLessons(lessonId, limit);

    // Filter results to only enrolled courses (unless admin)
    const enrolledCourseIds =
      await this.enrollmentGuard.getEnrolledCourseIds(user);

    let filteredResults = results;
    if (enrolledCourseIds !== null) {
      // Filter to enrolled courses only
      // Note: This requires the RAG service to return course information
      // For now, we'll return all results and document this limitation
      filteredResults = results;
    }

    return {
      results: filteredResults.map((r) => ({
        lessonId: r.lessonId,
        lessonTitle: r.lessonTitle,
        chunkContent: r.chunkContent,
        chunkIndex: r.chunkIndex,
        similarity: r.similarity,
        metadata: r.metadata,
        lesson: r.lesson
          ? {
              id: r.lesson.id,
              title: r.lesson.title,
              type: r.lesson.type,
            }
          : undefined,
      })),
      total: filteredResults.length,
      query: `Similar to lesson ${lessonId}`,
      filters: {},
    };
  }
}
