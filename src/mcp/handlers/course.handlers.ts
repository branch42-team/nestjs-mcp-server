import { CoursesService } from '@/api/courses/courses.service';
import { UserEntity } from '@/auth/entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { McpEnrollmentGuard } from '../guards/enrollment.guard';
import {
  GetCourseDetailsInput,
  GetLessonContentInput,
  ListCoursesInput,
  SearchCoursesInput,
} from '../tools/courses.tools';

/**
 * Course Handlers for MCP Tools
 *
 * Implements the business logic for course-related MCP tools.
 * All methods enforce enrollment-based authorization.
 */
@Injectable()
export class CourseHandlers {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly enrollmentGuard: McpEnrollmentGuard,
  ) {}

  /**
   * List courses based on user's enrollment
   * Admins see all courses, regular users see only enrolled courses
   */
  async listCourses(user: UserEntity, params: ListCoursesInput) {
    const { limit = 10, offset = 0 } = params;

    // Get enrolled course IDs (null for admins = all courses)
    const enrolledCourseIds =
      await this.enrollmentGuard.getEnrolledCourseIds(user);

    if (enrolledCourseIds === null) {
      // Admin: get all active courses
      const allCourses = await this.coursesService.getActiveCourses();
      const courses = allCourses.slice(offset, offset + limit);
      return {
        courses: courses.map((course) => ({
          id: course.id,
          title: course.title,
          description: course.description,
          thumbnailUrl: course.thumbnailUrl,
          duration: course.duration,
          isActive: course.isActive,
          createdAt: course.createdAt,
        })),
        total: courses.length,
        hasMore: offset + limit < allCourses.length,
      };
    } else if (enrolledCourseIds.length === 0) {
      // User with no enrollments
      return {
        courses: [],
        total: 0,
        hasMore: false,
      };
    } else {
      // Regular user: get enrolled courses only
      const allEnrolledCourses =
        await this.coursesService.getCoursesByIds(enrolledCourseIds);
      const courses = allEnrolledCourses.slice(offset, offset + limit);
      return {
        courses: courses.map((course) => ({
          id: course.id,
          title: course.title,
          description: course.description,
          thumbnailUrl: course.thumbnailUrl,
          duration: course.duration,
          isActive: course.isActive,
          createdAt: course.createdAt,
        })),
        total: courses.length,
        hasMore: offset + limit < allEnrolledCourses.length,
      };
    }
  }

  /**
   * Search courses by title/description
   * Results filtered by user enrollment
   */
  async searchCourses(user: UserEntity, params: SearchCoursesInput) {
    const { query, limit = 10 } = params;

    // Get enrolled course IDs
    const enrolledCourseIds =
      await this.enrollmentGuard.getEnrolledCourseIds(user);

    if (enrolledCourseIds !== null && enrolledCourseIds.length === 0) {
      // User with no enrollments
      return {
        courses: [],
        total: 0,
        query,
      };
    }

    // Get all courses (active only) and filter by enrollment
    const allCourses = await this.coursesService.getActiveCourses();

    // Filter by enrollment if needed
    let coursesToSearch = allCourses;
    if (enrolledCourseIds !== null) {
      coursesToSearch = allCourses.filter((c) =>
        enrolledCourseIds.includes(c.id),
      );
    }

    // Simple text search on title and description
    const searchLower = query.toLowerCase();
    const matchingCourses = coursesToSearch
      .filter(
        (c) =>
          c.title.toLowerCase().includes(searchLower) ||
          c.description.toLowerCase().includes(searchLower),
      )
      .slice(0, limit);

    return {
      courses: matchingCourses.map((course) => ({
        id: course.id,
        title: course.title,
        description: course.description,
        thumbnailUrl: course.thumbnailUrl,
        duration: course.duration,
        isActive: course.isActive,
        createdAt: course.createdAt,
      })),
      total: matchingCourses.length,
      query,
    };
  }

  /**
   * Get detailed course information including modules and lessons
   * Requires enrollment verification
   */
  async getCourseDetails(user: UserEntity, params: GetCourseDetailsInput) {
    const { courseId } = params;

    // Verify enrollment (throws if not enrolled and not admin)
    await this.enrollmentGuard.verifyEnrollment(user, courseId);

    // Get course with details
    const course = await this.coursesService.getCourse(courseId);

    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    return {
      id: course.id,
      title: course.title,
      description: course.description,
      thumbnailUrl: course.thumbnailUrl,
      duration: course.duration,
      isActive: course.isActive,
      metadata: course.metadata,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
      modules: course.modules
        ?.filter((m: any) => m.isActive)
        .sort((a: any, b: any) => a.orderIndex - b.orderIndex)
        .map((module: any) => ({
          id: module.id,
          title: module.title,
          description: module.description,
          orderIndex: module.orderIndex,
          lessons: module.lessons
            ?.filter((l: any) => l.isActive)
            .sort((a: any, b: any) => a.orderIndex - b.orderIndex)
            .map((lesson: any) => ({
              id: lesson.id,
              title: lesson.title,
              description: lesson.description,
              type: lesson.type,
              duration: lesson.duration,
              orderIndex: lesson.orderIndex,
            })),
        })),
    };
  }

  /**
   * Get specific lesson content
   * Requires enrollment in the course containing the lesson
   */
  async getLessonContent(user: UserEntity, params: GetLessonContentInput) {
    const { lessonId } = params;

    // Resolve course ID from lesson
    const courseId =
      await this.enrollmentGuard.resolveCourseIdFromLesson(lessonId);

    // Verify enrollment
    await this.enrollmentGuard.verifyEnrollment(user, courseId);

    // Get lesson
    const lesson = await this.coursesService.getLesson(lessonId);

    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${lessonId} not found`);
    }

    return {
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      type: lesson.type,
      content: lesson.content,
      videoUrl: lesson.videoUrl,
      documentUrl: lesson.documentUrl,
      duration: lesson.duration,
      orderIndex: lesson.orderIndex,
      metadata: lesson.metadata,
      moduleId: lesson.moduleId,
      createdAt: lesson.createdAt,
      updatedAt: lesson.updatedAt,
    };
  }
}
