import { AuthGuard } from '@/auth/auth.guard';
import { CurrentUserSession } from '@/decorators/auth/current-user-session.decorator';
import { ApiAuth } from '@/decorators/http.decorators';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CourseDetailDto, CourseDto, LessonDto } from './dto/course.dto';
import {
  EnrollmentWithCourseDto,
  UpdateEnrollmentDto,
} from './dto/enrollment.dto';

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
@UseGuards(AuthGuard)
export class CoursesUserController {
  constructor(private readonly coursesService: CoursesService) {}

  // ==================== Course Browsing ====================

  @ApiAuth({
    summary: 'Get all active courses',
    type: CourseDto,
  })
  @Get()
  async getActiveCourses(): Promise<CourseDto[]> {
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
