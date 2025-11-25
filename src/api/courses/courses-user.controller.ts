import { AuthGuard } from '@/auth/auth.guard';
import { CurrentUserSession } from '@/decorators/auth/current-user-session.decorator';
import { ApiAuth } from '@/decorators/http.decorators';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CoursesRagService } from './courses-rag.service';
import { CoursesService } from './courses.service';
import { CourseDetailDto, CourseDto, LessonDto } from './dto/course.dto';
import {
  EnrollmentWithCourseDto,
  UpdateEnrollmentDto,
} from './dto/enrollment.dto';
import { EnrollmentGuard } from './guards/enrollment.guard';
import { SkipEnrollmentCheck } from './guards/skip-enrollment-check.decorator';

/**
 * User Course Controller
 *
 * Provides endpoints for authenticated users to view courses and manage their enrollments.
 */
@ApiTags('courses')
@Controller({
  path: 'courses',
  version: '1',
})
@UseGuards(AuthGuard, EnrollmentGuard)
export class CoursesUserController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly ragService: CoursesRagService,
  ) {}

  // ==================== Course Browsing ====================

  @ApiAuth({
    summary: 'Get all active courses',
    type: CourseDto,
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search courses by content using semantic search',
    type: String,
  })
  @SkipEnrollmentCheck()
  @Get()
  async getActiveCourses(
    @Query('search') search?: string,
  ): Promise<CourseDto[]> {
    // If search query is provided, use semantic search
    if (search) {
      const searchResults = await this.ragService.semanticSearch(
        search,
        {},
        20,
      );

      // Extract unique lesson IDs from search results
      const lessonIds = Array.from(
        new Set(searchResults.map((r) => r.lessonId)),
      );

      if (lessonIds.length === 0) {
        return [];
      }

      // Get all active courses and check which ones contain matching lessons
      const allCourses = await this.coursesService.getActiveCourses();

      // Filter courses that have matching lessons
      const matchingCourses: CourseDto[] = [];
      for (const course of allCourses) {
        const courseDetail = await this.coursesService.getCourse(course.id);
        const hasMatchingLesson = courseDetail.modules?.some((module) =>
          (module as any).lessons?.some((lesson: any) =>
            lessonIds.includes(lesson.id),
          ),
        );

        if (hasMatchingLesson) {
          matchingCourses.push(course);
        }
      }

      return matchingCourses;
    }

    // Default behavior without search
    return this.coursesService.getActiveCourses();
  }

  @ApiAuth({
    summary: 'Get course details with modules and lessons',
    type: CourseDetailDto,
  })
  @ApiParam({ name: 'id', type: 'string', description: 'Course ID' })
  @Get(':id')
  async getCourse(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<CourseDetailDto> {
    return this.coursesService.getCourse(id);
  }

  @ApiAuth({
    summary: 'Get lesson details',
    type: LessonDto,
  })
  @ApiParam({ name: 'lessonId', type: 'string', description: 'Lesson ID' })
  @Get('lessons/:lessonId')
  async getLesson(
    @Param('lessonId', ParseUUIDPipe) lessonId: string,
  ): Promise<LessonDto> {
    return this.coursesService.getLesson(lessonId);
  }

  // ==================== User Enrollments ====================

  @ApiAuth({
    summary: 'Get current user enrollments',
    type: EnrollmentWithCourseDto,
  })
  @SkipEnrollmentCheck()
  @Get('my/enrollments')
  async getMyEnrollments(
    @CurrentUserSession('user') user: CurrentUserSession['user'],
  ): Promise<EnrollmentWithCourseDto[]> {
    return this.coursesService.getUserEnrollments(user.id);
  }

  @ApiAuth({
    summary: 'Get enrollment details',
    type: EnrollmentWithCourseDto,
  })
  @ApiParam({
    name: 'enrollmentId',
    type: 'string',
    description: 'Enrollment ID',
  })
  @SkipEnrollmentCheck()
  @Get('enrollments/:enrollmentId')
  async getEnrollment(
    @Param('enrollmentId', ParseUUIDPipe) enrollmentId: string,
  ): Promise<EnrollmentWithCourseDto> {
    return this.coursesService.getEnrollment(enrollmentId);
  }

  @ApiAuth({
    summary: 'Update enrollment progress',
    type: EnrollmentWithCourseDto,
    description: 'Update enrollment status, progress percentage, and metadata',
  })
  @ApiParam({
    name: 'enrollmentId',
    type: 'string',
    description: 'Enrollment ID',
  })
  @SkipEnrollmentCheck()
  @Put('enrollments/:enrollmentId')
  async updateEnrollment(
    @Param('enrollmentId', ParseUUIDPipe) enrollmentId: string,
    @Body() dto: UpdateEnrollmentDto,
  ): Promise<EnrollmentWithCourseDto> {
    const updated = await this.coursesService.updateEnrollment(
      enrollmentId,
      dto,
    );
    return this.coursesService.getEnrollment(updated.id);
  }
}
