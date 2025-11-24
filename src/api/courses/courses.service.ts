import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
import {
  EnrollmentDto,
  EnrollmentWithCourseDto,
  EnrollUserDto,
  UpdateEnrollmentDto,
} from './dto/enrollment.dto';
import { CourseEntity } from './entities/course.entity';
import {
  EnrollmentEntity,
  EnrollmentStatus,
} from './entities/enrollment.entity';
import { LessonEntity } from './entities/lesson.entity';
import { ModuleEntity } from './entities/module.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CourseEntity)
    private courseRepository: Repository<CourseEntity>,
    @InjectRepository(ModuleEntity)
    private moduleRepository: Repository<ModuleEntity>,
    @InjectRepository(LessonEntity)
    private lessonRepository: Repository<LessonEntity>,
    @InjectRepository(EnrollmentEntity)
    private enrollmentRepository: Repository<EnrollmentEntity>,
  ) {}

  // ==================== Course Management ====================

  async createCourse(dto: CreateCourseDto): Promise<CourseDto> {
    const course = this.courseRepository.create(dto);
    const saved = await this.courseRepository.save(course);
    return saved.toDto(CourseDto);
  }

  async getCourse(id: string): Promise<CourseDetailDto> {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['modules', 'modules.lessons'],
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    return course.toDto(CourseDetailDto);
  }

  async getAllCourses(): Promise<CourseDto[]> {
    const courses = await this.courseRepository.find({
      order: { createdAt: 'DESC' },
    });
    return courses.map((course) => course.toDto(CourseDto));
  }

  async getActiveCourses(): Promise<CourseDto[]> {
    const courses = await this.courseRepository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });
    return courses.map((course) => course.toDto(CourseDto));
  }

  async updateCourse(id: string, dto: UpdateCourseDto): Promise<CourseDto> {
    const course = await this.courseRepository.findOne({ where: { id } });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    Object.assign(course, dto);
    const updated = await this.courseRepository.save(course);
    return updated.toDto(CourseDto);
  }

  async deleteCourse(id: string): Promise<void> {
    const course = await this.courseRepository.findOne({ where: { id } });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    await this.courseRepository.softDelete(id);
  }

  // ==================== Module Management ====================

  async createModule(
    courseId: string,
    dto: CreateModuleDto,
  ): Promise<ModuleDto> {
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    const module = this.moduleRepository.create({
      ...dto,
      courseId,
    });

    const saved = await this.moduleRepository.save(module);
    return saved.toDto(ModuleDto);
  }

  async getModule(id: string): Promise<ModuleDetailDto> {
    const module = await this.moduleRepository.findOne({
      where: { id },
      relations: ['lessons'],
    });

    if (!module) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }

    return module.toDto(ModuleDetailDto);
  }

  async getCourseModules(courseId: string): Promise<ModuleDto[]> {
    const modules = await this.moduleRepository.find({
      where: { courseId },
      order: { orderIndex: 'ASC' },
    });
    return modules.map((module) => module.toDto(ModuleDto));
  }

  async updateModule(id: string, dto: UpdateModuleDto): Promise<ModuleDto> {
    const module = await this.moduleRepository.findOne({ where: { id } });

    if (!module) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }

    Object.assign(module, dto);
    const updated = await this.moduleRepository.save(module);
    return updated.toDto(ModuleDto);
  }

  async deleteModule(id: string): Promise<void> {
    const module = await this.moduleRepository.findOne({ where: { id } });

    if (!module) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }

    await this.moduleRepository.softDelete(id);
  }

  // ==================== Lesson Management ====================

  async createLesson(
    moduleId: string,
    dto: CreateLessonDto,
  ): Promise<LessonDto> {
    const module = await this.moduleRepository.findOne({
      where: { id: moduleId },
    });

    if (!module) {
      throw new NotFoundException(`Module with ID ${moduleId} not found`);
    }

    const lesson = this.lessonRepository.create({
      ...dto,
      moduleId,
    });

    const saved = await this.lessonRepository.save(lesson);
    return saved.toDto(LessonDto);
  }

  async getLesson(id: string): Promise<LessonDto> {
    const lesson = await this.lessonRepository.findOne({ where: { id } });

    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }

    return lesson.toDto(LessonDto);
  }

  async getModuleLessons(moduleId: string): Promise<LessonDto[]> {
    const lessons = await this.lessonRepository.find({
      where: { moduleId },
      order: { orderIndex: 'ASC' },
    });
    return lessons.map((lesson) => lesson.toDto(LessonDto));
  }

  async updateLesson(id: string, dto: UpdateLessonDto): Promise<LessonDto> {
    const lesson = await this.lessonRepository.findOne({ where: { id } });

    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }

    Object.assign(lesson, dto);
    const updated = await this.lessonRepository.save(lesson);
    return updated.toDto(LessonDto);
  }

  async deleteLesson(id: string): Promise<void> {
    const lesson = await this.lessonRepository.findOne({ where: { id } });

    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }

    await this.lessonRepository.softDelete(id);
  }

  // ==================== Enrollment Management ====================

  async enrollUser(
    courseId: string,
    dto: EnrollUserDto,
  ): Promise<EnrollmentDto> {
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    // Check if user is already enrolled
    const existing = await this.enrollmentRepository.findOne({
      where: {
        userId: dto.userId,
        courseId,
      },
    });

    if (existing) {
      throw new ConflictException(
        `User ${dto.userId} is already enrolled in course ${courseId}`,
      );
    }

    const enrollment = this.enrollmentRepository.create({
      userId: dto.userId,
      courseId,
      status: EnrollmentStatus.ENROLLED,
      progressPercentage: 0,
    });

    const saved = await this.enrollmentRepository.save(enrollment);
    return saved.toDto(EnrollmentDto);
  }

  async getEnrollment(id: string): Promise<EnrollmentWithCourseDto> {
    const enrollment = await this.enrollmentRepository.findOne({
      where: { id },
      relations: ['course'],
    });

    if (!enrollment) {
      throw new NotFoundException(`Enrollment with ID ${id} not found`);
    }

    return enrollment.toDto(EnrollmentWithCourseDto);
  }

  async getUserEnrollments(userId: string): Promise<EnrollmentWithCourseDto[]> {
    const enrollments = await this.enrollmentRepository.find({
      where: { userId },
      relations: ['course'],
      order: { enrolledAt: 'DESC' },
    });
    return enrollments.map((enrollment) =>
      enrollment.toDto(EnrollmentWithCourseDto),
    );
  }

  async getCourseEnrollments(courseId: string): Promise<EnrollmentDto[]> {
    const enrollments = await this.enrollmentRepository.find({
      where: { courseId },
      order: { enrolledAt: 'DESC' },
    });
    return enrollments.map((enrollment) => enrollment.toDto(EnrollmentDto));
  }

  async updateEnrollment(
    id: string,
    dto: UpdateEnrollmentDto,
  ): Promise<EnrollmentDto> {
    const enrollment = await this.enrollmentRepository.findOne({
      where: { id },
    });

    if (!enrollment) {
      throw new NotFoundException(`Enrollment with ID ${id} not found`);
    }

    Object.assign(enrollment, dto);

    // Auto-set completedAt if status is changed to COMPLETED
    if (dto.status === EnrollmentStatus.COMPLETED && !enrollment.completedAt) {
      enrollment.completedAt = new Date();
      enrollment.progressPercentage = 100;
    }

    const updated = await this.enrollmentRepository.save(enrollment);
    return updated.toDto(EnrollmentDto);
  }

  async unenrollUser(id: string): Promise<void> {
    const enrollment = await this.enrollmentRepository.findOne({
      where: { id },
    });

    if (!enrollment) {
      throw new NotFoundException(`Enrollment with ID ${id} not found`);
    }

    await this.enrollmentRepository.softDelete(id);
  }
}
