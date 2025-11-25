import { Role } from '@/api/user/user.enum';
import { AuthGuard } from '@/auth/auth.guard';
import { Job, Queue } from '@/constants/job.constant';
import { Roles } from '@/decorators/auth/roles.decorator';
import { RolesGuard } from '@/decorators/auth/roles.guard';
import { ApiAuth } from '@/decorators/http.decorators';
import { EmbeddingQueueService } from '@/worker/queues/embedding/embedding.service';
import { InjectQueue } from '@nestjs/bullmq';
import {
  Body,
  Controller,
  Delete,
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
import { Queue as QueueType } from 'bullmq';
import { CoursesService } from './courses.service';
import {
  CourseDetailDto,
  CourseDto,
  CreateCourseDto,
  CreateLessonDto,
  CreateModuleDto,
  LessonDto,
  ModuleDetailDto,
  ModuleDto,
  UpdateCourseDto,
  UpdateLessonDto,
  UpdateModuleDto,
} from './dto/course.dto';
import { EnrollUserDto, EnrollmentDto } from './dto/enrollment.dto';
import { SkipEnrollmentCheck } from './guards/skip-enrollment-check.decorator';

/**
 * Admin Course Management Controller
 *
 * Provides endpoints for administrators to manage courses, modules, lessons, and enrollments.
 * All endpoints require Admin role.
 */
@ApiTags('admin-courses')
@Controller({
  path: 'admin/courses',
  version: '1',
})
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.Admin)
@SkipEnrollmentCheck()
export class CoursesAdminController {
  constructor(
    private readonly coursesService: CoursesService,
    @InjectQueue(Queue.Embedding)
    private readonly embeddingQueue: QueueType,
    private readonly embeddingQueueService: EmbeddingQueueService,
  ) {}

  // ==================== Course Management ====================

  @ApiAuth({
    summary: 'Create a new course',
    type: CourseDto,
    statusCode: HttpStatus.CREATED,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCourse(@Body() dto: CreateCourseDto): Promise<CourseDto> {
    return this.coursesService.createCourse(dto);
  }

  @ApiAuth({
    summary: 'Get all courses (including inactive)',
    type: CourseDto,
  })
  @Get()
  async getAllCourses(): Promise<CourseDto[]> {
    return this.coursesService.getAllCourses();
  }

  @ApiAuth({
    summary: 'Get course by ID with modules and lessons',
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
    summary: 'Update a course',
    type: CourseDto,
  })
  @ApiParam({ name: 'id', type: 'string', description: 'Course ID' })
  @Put(':id')
  async updateCourse(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCourseDto,
  ): Promise<CourseDto> {
    return this.coursesService.updateCourse(id, dto);
  }

  @ApiAuth({
    summary: 'Delete a course (soft delete)',
    errorResponses: [400, 401, 403, 404, 500],
  })
  @ApiParam({ name: 'id', type: 'string', description: 'Course ID' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCourse(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.coursesService.deleteCourse(id);
  }

  // ==================== Module Management ====================

  @ApiAuth({
    summary: 'Create a new module in a course',
    type: ModuleDto,
    statusCode: HttpStatus.CREATED,
  })
  @ApiParam({ name: 'courseId', type: 'string', description: 'Course ID' })
  @Post(':courseId/modules')
  @HttpCode(HttpStatus.CREATED)
  async createModule(
    @Param('courseId', ParseUUIDPipe) courseId: string,
    @Body() dto: CreateModuleDto,
  ): Promise<ModuleDto> {
    return this.coursesService.createModule(courseId, dto);
  }

  @ApiAuth({
    summary: 'Get all modules in a course',
    type: ModuleDto,
  })
  @ApiParam({ name: 'courseId', type: 'string', description: 'Course ID' })
  @Get(':courseId/modules')
  async getCourseModules(
    @Param('courseId', ParseUUIDPipe) courseId: string,
  ): Promise<ModuleDto[]> {
    return this.coursesService.getCourseModules(courseId);
  }

  @ApiAuth({
    summary: 'Get module by ID with lessons',
    type: ModuleDetailDto,
  })
  @ApiParam({ name: 'moduleId', type: 'string', description: 'Module ID' })
  @Get('modules/:moduleId')
  async getModule(
    @Param('moduleId', ParseUUIDPipe) moduleId: string,
  ): Promise<ModuleDetailDto> {
    return this.coursesService.getModule(moduleId);
  }

  @ApiAuth({
    summary: 'Update a module',
    type: ModuleDto,
  })
  @ApiParam({ name: 'moduleId', type: 'string', description: 'Module ID' })
  @Put('modules/:moduleId')
  async updateModule(
    @Param('moduleId', ParseUUIDPipe) moduleId: string,
    @Body() dto: UpdateModuleDto,
  ): Promise<ModuleDto> {
    return this.coursesService.updateModule(moduleId, dto);
  }

  @ApiAuth({
    summary: 'Delete a module (soft delete)',
    errorResponses: [400, 401, 403, 404, 500],
  })
  @ApiParam({ name: 'moduleId', type: 'string', description: 'Module ID' })
  @Delete('modules/:moduleId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteModule(
    @Param('moduleId', ParseUUIDPipe) moduleId: string,
  ): Promise<void> {
    return this.coursesService.deleteModule(moduleId);
  }

  // ==================== Lesson Management ====================

  @ApiAuth({
    summary: 'Create a new lesson in a module',
    type: LessonDto,
    statusCode: HttpStatus.CREATED,
  })
  @ApiParam({ name: 'moduleId', type: 'string', description: 'Module ID' })
  @Post('modules/:moduleId/lessons')
  @HttpCode(HttpStatus.CREATED)
  async createLesson(
    @Param('moduleId', ParseUUIDPipe) moduleId: string,
    @Body() dto: CreateLessonDto,
  ): Promise<LessonDto> {
    return this.coursesService.createLesson(moduleId, dto);
  }

  @ApiAuth({
    summary: 'Get all lessons in a module',
    type: LessonDto,
  })
  @ApiParam({ name: 'moduleId', type: 'string', description: 'Module ID' })
  @Get('modules/:moduleId/lessons')
  async getModuleLessons(
    @Param('moduleId', ParseUUIDPipe) moduleId: string,
  ): Promise<LessonDto[]> {
    return this.coursesService.getModuleLessons(moduleId);
  }

  @ApiAuth({
    summary: 'Get lesson by ID',
    type: LessonDto,
  })
  @ApiParam({ name: 'lessonId', type: 'string', description: 'Lesson ID' })
  @Get('lessons/:lessonId')
  async getLesson(
    @Param('lessonId', ParseUUIDPipe) lessonId: string,
  ): Promise<LessonDto> {
    return this.coursesService.getLesson(lessonId);
  }

  @ApiAuth({
    summary: 'Update a lesson',
    type: LessonDto,
  })
  @ApiParam({ name: 'lessonId', type: 'string', description: 'Lesson ID' })
  @Put('lessons/:lessonId')
  async updateLesson(
    @Param('lessonId', ParseUUIDPipe) lessonId: string,
    @Body() dto: UpdateLessonDto,
  ): Promise<LessonDto> {
    return this.coursesService.updateLesson(lessonId, dto);
  }

  @ApiAuth({
    summary: 'Delete a lesson (soft delete)',
    errorResponses: [400, 401, 403, 404, 500],
  })
  @ApiParam({ name: 'lessonId', type: 'string', description: 'Lesson ID' })
  @Delete('lessons/:lessonId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteLesson(
    @Param('lessonId', ParseUUIDPipe) lessonId: string,
  ): Promise<void> {
    return this.coursesService.deleteLesson(lessonId);
  }

  // ==================== Enrollment Management ====================

  @ApiAuth({
    summary: 'Enroll a user in a course',
    type: EnrollmentDto,
    statusCode: HttpStatus.CREATED,
  })
  @ApiParam({ name: 'courseId', type: 'string', description: 'Course ID' })
  @Post(':courseId/enroll')
  @HttpCode(HttpStatus.CREATED)
  async enrollUser(
    @Param('courseId', ParseUUIDPipe) courseId: string,
    @Body() dto: EnrollUserDto,
  ): Promise<EnrollmentDto> {
    return this.coursesService.enrollUser(courseId, dto);
  }

  @ApiAuth({
    summary: 'Get all enrollments for a course',
    type: EnrollmentDto,
  })
  @ApiParam({ name: 'courseId', type: 'string', description: 'Course ID' })
  @Get(':courseId/enrollments')
  async getCourseEnrollments(
    @Param('courseId', ParseUUIDPipe) courseId: string,
  ): Promise<EnrollmentDto[]> {
    return this.coursesService.getCourseEnrollments(courseId);
  }

  @ApiAuth({
    summary: 'Unenroll a user from a course',
    errorResponses: [400, 401, 403, 404, 500],
  })
  @ApiParam({
    name: 'enrollmentId',
    type: 'string',
    description: 'Enrollment ID',
  })
  @Delete('enrollments/:enrollmentId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async unenrollUser(
    @Param('enrollmentId', ParseUUIDPipe) enrollmentId: string,
  ): Promise<void> {
    return this.coursesService.unenrollUser(enrollmentId);
  }

  // ==================== Embedding Management ====================

  @ApiAuth({
    summary: 'Trigger reindexing for a specific course',
    description:
      'Queue embedding generation for all lessons in a course. Useful after bulk content updates.',
    errorResponses: [400, 401, 403, 404, 500],
  })
  @ApiParam({ name: 'courseId', type: 'string', description: 'Course ID' })
  @Post(':courseId/reindex')
  @HttpCode(HttpStatus.ACCEPTED)
  async reindexCourse(
    @Param('courseId', ParseUUIDPipe) courseId: string,
  ): Promise<{ message: string; jobId: string }> {
    const job = await this.embeddingQueue.add(
      Job.Embedding.EmbedCourse,
      { courseId, forceReindex: true },
      { removeOnComplete: false, removeOnFail: false },
    );

    return {
      message: `Reindexing job queued for course ${courseId}`,
      jobId: job.id!,
    };
  }

  @ApiAuth({
    summary: 'Get embedding statistics',
    description:
      'Returns statistics about embedding coverage and processing status',
    errorResponses: [401, 403, 500],
  })
  @Get('embeddings/stats')
  async getEmbeddingStats(): Promise<{
    totalEmbeddings: number;
    totalLessons: number;
    lessonsWithEmbeddings: number;
    averageChunksPerLesson: number;
    coveragePercentage: number;
  }> {
    const stats = await this.embeddingQueueService.getEmbeddingStats();
    return {
      ...stats,
      coveragePercentage:
        stats.totalLessons > 0
          ? (stats.lessonsWithEmbeddings / stats.totalLessons) * 100
          : 0,
    };
  }

  @ApiAuth({
    summary: 'Clear embeddings for a specific lesson',
    description:
      'Delete all embeddings for a lesson. Useful for troubleshooting.',
    errorResponses: [400, 401, 403, 404, 500],
  })
  @ApiParam({ name: 'lessonId', type: 'string', description: 'Lesson ID' })
  @Delete('embeddings/lessons/:lessonId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async clearLessonEmbeddings(
    @Param('lessonId', ParseUUIDPipe) lessonId: string,
  ): Promise<void> {
    // The deletion will happen automatically via cascade when we delete the embeddings
    // But we can also manually trigger it here
    await this.embeddingQueue.add(
      Job.Embedding.EmbedLesson,
      { lessonId, forceReindex: true },
      { removeOnComplete: true, removeOnFail: false },
    );
  }

  @ApiAuth({
    summary: 'Trigger full system reindex',
    description:
      'Queue embedding generation for all lessons. This is a heavy operation.',
    errorResponses: [401, 403, 500],
  })
  @Post('embeddings/reindex-all')
  @HttpCode(HttpStatus.ACCEPTED)
  async reindexAll(): Promise<{ message: string; jobId: string }> {
    const job = await this.embeddingQueue.add(
      Job.Embedding.ReindexAll,
      { forceReindex: false, batchSize: 100 },
      { removeOnComplete: false, removeOnFail: false },
    );

    return {
      message: 'Full reindex job queued',
      jobId: job.id!,
    };
  }
}
