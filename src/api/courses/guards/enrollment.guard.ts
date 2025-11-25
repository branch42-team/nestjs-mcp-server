import { Role } from '@/api/user/user.enum';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { FastifyRequest } from 'fastify';
import { Repository } from 'typeorm';
import { EnrollmentEntity } from '../entities/enrollment.entity';
import { LessonEntity } from '../entities/lesson.entity';
import { ModuleEntity } from '../entities/module.entity';
import { SKIP_ENROLLMENT_CHECK_KEY } from './skip-enrollment-check.decorator';

/**
 * EnrollmentGuard
 *
 * Ensures that users can only access content from courses they are enrolled in.
 * This guard checks enrollment status for course, module, and lesson endpoints.
 *
 * The guard extracts identifiers from route parameters in this order:
 * 1. courseId - Direct course access
 * 2. moduleId - Access to module, resolves to courseId
 * 3. lessonId - Access to lesson, resolves to moduleId then courseId
 *
 * Use @SkipEnrollmentCheck() decorator to bypass this guard for specific endpoints
 * (e.g., course browsing, admin endpoints).
 */
@Injectable()
export class EnrollmentGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(EnrollmentEntity)
    private readonly enrollmentRepository: Repository<EnrollmentEntity>,
    @InjectRepository(ModuleEntity)
    private readonly moduleRepository: Repository<ModuleEntity>,
    @InjectRepository(LessonEntity)
    private readonly lessonRepository: Repository<LessonEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check if enrollment check should be skipped
    const skipCheck = this.reflector.getAllAndOverride<boolean>(
      SKIP_ENROLLMENT_CHECK_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (skipCheck) {
      return true;
    }

    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const session = request['session'];

    if (!session?.user) {
      throw new ForbiddenException('User session not found');
    }

    // Skip enrollment check for admin users
    if (session.user.role === Role.Admin) {
      return true;
    }

    const userId = session.user.id;
    const params = request.params as Record<string, string>;

    // Extract identifiers from route parameters
    const courseId = params.courseId || params.id; // Support both :courseId and :id
    const moduleId = params.moduleId;
    const lessonId = params.lessonId;

    // Resolve to courseId based on the available parameter
    let resolvedCourseId: string | null = null;

    if (courseId) {
      resolvedCourseId = courseId;
    } else if (moduleId) {
      resolvedCourseId = await this.getCourseIdFromModule(moduleId);
    } else if (lessonId) {
      resolvedCourseId = await this.getCourseIdFromLesson(lessonId);
    }

    // If no course identifier found, allow access (might be a listing endpoint)
    if (!resolvedCourseId) {
      return true;
    }

    // Check if user is enrolled in the course
    const isEnrolled = await this.checkEnrollment(userId, resolvedCourseId);

    if (!isEnrolled) {
      throw new ForbiddenException(
        'You are not enrolled in this course. Please enroll to access this content.',
      );
    }

    return true;
  }

  /**
   * Resolves courseId from a moduleId
   */
  private async getCourseIdFromModule(moduleId: string): Promise<string> {
    const module = await this.moduleRepository.findOne({
      where: { id: moduleId },
      select: ['courseId'],
    });

    if (!module) {
      throw new NotFoundException(`Module with ID ${moduleId} not found`);
    }

    return module.courseId;
  }

  /**
   * Resolves courseId from a lessonId
   */
  private async getCourseIdFromLesson(lessonId: string): Promise<string> {
    const lesson = await this.lessonRepository.findOne({
      where: { id: lessonId },
      relations: ['module'],
      select: ['id', 'moduleId'],
    });

    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${lessonId} not found`);
    }

    const module = await this.moduleRepository.findOne({
      where: { id: lesson.moduleId },
      select: ['courseId'],
    });

    if (!module) {
      throw new NotFoundException(`Module not found for lesson ${lessonId}`);
    }

    return module.courseId;
  }

  /**
   * Checks if a user is enrolled in a course
   * Only considers active enrollment statuses (enrolled, in_progress, completed)
   */
  private async checkEnrollment(
    userId: string,
    courseId: string,
  ): Promise<boolean> {
    const enrollment = await this.enrollmentRepository.findOne({
      where: {
        userId,
        courseId,
      },
    });

    // User must have an enrollment and it should not be suspended
    return !!enrollment && enrollment.status !== 'suspended';
  }
}
