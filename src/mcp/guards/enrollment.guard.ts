import { EnrollmentEntity } from '@/api/courses/entities/enrollment.entity';
import { LessonEntity } from '@/api/courses/entities/lesson.entity';
import { ModuleEntity } from '@/api/courses/entities/module.entity';
import { Role } from '@/api/user/user.enum';
import { UserEntity } from '@/auth/entities/user.entity';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/**
 * MCP Enrollment Guard
 *
 * Provides enrollment verification logic for MCP tools.
 * Ensures users can only access courses they're enrolled in.
 * Admins bypass all enrollment checks.
 */
@Injectable()
export class McpEnrollmentGuard {
  constructor(
    @InjectRepository(EnrollmentEntity)
    private readonly enrollmentRepository: Repository<EnrollmentEntity>,
    @InjectRepository(ModuleEntity)
    private readonly moduleRepository: Repository<ModuleEntity>,
    @InjectRepository(LessonEntity)
    private readonly lessonRepository: Repository<LessonEntity>,
  ) {}

  /**
   * Verify if user is enrolled in a course, throws if not
   * Admins bypass this check
   */
  async verifyEnrollment(user: UserEntity, courseId: string): Promise<void> {
    // Admins can access everything
    if (user.role === Role.Admin) {
      return;
    }

    const enrollment = await this.enrollmentRepository.findOne({
      where: {
        userId: user.id,
        courseId,
      },
    });

    if (!enrollment || enrollment.status === 'suspended') {
      throw new ForbiddenException(
        'You are not enrolled in this course. Please enroll to access this content.',
      );
    }
  }

  /**
   * Get list of course IDs the user is enrolled in
   * Admins get null (indicating all courses)
   */
  async getEnrolledCourseIds(user: UserEntity): Promise<string[] | null> {
    // Admins can access all courses
    if (user.role === Role.Admin) {
      return null;
    }

    const enrollments = await this.enrollmentRepository.find({
      where: {
        userId: user.id,
      },
      select: ['courseId'],
    });

    return enrollments
      .filter((e) => e.status !== 'suspended')
      .map((e) => e.courseId);
  }

  /**
   * Resolve courseId from a moduleId
   */
  async resolveCourseIdFromModule(moduleId: string): Promise<string> {
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
   * Resolve courseId from a lessonId (via module)
   */
  async resolveCourseIdFromLesson(lessonId: string): Promise<string> {
    const lesson = await this.lessonRepository.findOne({
      where: { id: lessonId },
      select: ['id', 'moduleId'],
    });

    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${lessonId} not found`);
    }

    return this.resolveCourseIdFromModule(lesson.moduleId);
  }

  /**
   * Check if user is admin
   */
  isAdmin(user: UserEntity): boolean {
    return user.role === Role.Admin;
  }
}
