import {
  BooleanFieldOptional,
  ClassField,
  NumberFieldOptional,
  StringField,
  StringFieldOptional,
  URLFieldOptional,
} from '@/decorators/field.decorators';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsObject, IsOptional } from 'class-validator';

// Course DTOs
export class CreateCourseDto {
  @StringField({ description: 'Course title' })
  title: string;

  @StringField({ description: 'Course description' })
  description: string;

  @URLFieldOptional({ description: 'Course thumbnail URL' })
  thumbnailUrl?: string;

  @NumberFieldOptional({
    description: 'Course duration in minutes',
    min: 0,
  })
  duration?: number;

  @BooleanFieldOptional({ description: 'Is the course active?', default: true })
  isActive?: boolean;

  @ApiProperty({
    description: 'Additional metadata',
    type: 'object',
    required: false,
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

export class UpdateCourseDto {
  @StringFieldOptional({ description: 'Course title' })
  title?: string;

  @StringFieldOptional({ description: 'Course description' })
  description?: string;

  @URLFieldOptional({ description: 'Course thumbnail URL' })
  thumbnailUrl?: string;

  @NumberFieldOptional({
    description: 'Course duration in minutes',
    min: 0,
  })
  duration?: number;

  @BooleanFieldOptional({ description: 'Is the course active?' })
  isActive?: boolean;

  @ApiProperty({
    description: 'Additional metadata',
    type: 'object',
    required: false,
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

@Exclude()
export class CourseDto {
  @StringField()
  @Expose()
  id: string;

  @StringField()
  @Expose()
  title: string;

  @StringField()
  @Expose()
  description: string;

  @StringFieldOptional()
  @Expose()
  thumbnailUrl?: string;

  @ApiProperty({ type: Boolean })
  @Expose()
  isActive: boolean;

  @ApiProperty({ type: Number })
  @Expose()
  duration: number;

  @ApiProperty({ type: 'object', required: false })
  @Expose()
  metadata?: Record<string, any>;

  @ClassField(() => Date)
  @Expose()
  createdAt: Date;

  @ClassField(() => Date)
  @Expose()
  updatedAt: Date;
}

@Exclude()
export class CourseDetailDto extends CourseDto {
  @ApiProperty({ type: () => [ModuleDto], description: 'Course modules' })
  @Type(() => ModuleDto)
  @Expose()
  modules: ModuleDto[];
}

// Module DTOs
export class CreateModuleDto {
  @StringField({ description: 'Module title' })
  title: string;

  @StringFieldOptional({ description: 'Module description' })
  description?: string;

  @NumberFieldOptional({
    description: 'Order index of the module',
    min: 0,
  })
  orderIndex?: number;

  @BooleanFieldOptional({ description: 'Is the module active?', default: true })
  isActive?: boolean;
}

export class UpdateModuleDto {
  @StringFieldOptional({ description: 'Module title' })
  title?: string;

  @StringFieldOptional({ description: 'Module description' })
  description?: string;

  @NumberFieldOptional({
    description: 'Order index of the module',
    min: 0,
  })
  orderIndex?: number;

  @BooleanFieldOptional({ description: 'Is the module active?' })
  isActive?: boolean;
}

@Exclude()
export class ModuleDto {
  @StringField()
  @Expose()
  id: string;

  @StringField()
  @Expose()
  title: string;

  @StringFieldOptional()
  @Expose()
  description?: string;

  @ApiProperty({ type: Number })
  @Expose()
  orderIndex: number;

  @ApiProperty({ type: Boolean })
  @Expose()
  isActive: boolean;

  @StringField()
  @Expose()
  courseId: string;

  @ClassField(() => Date)
  @Expose()
  createdAt: Date;

  @ClassField(() => Date)
  @Expose()
  updatedAt: Date;
}

@Exclude()
export class ModuleDetailDto extends ModuleDto {
  @ApiProperty({ type: () => [LessonDto], description: 'Module lessons' })
  @Type(() => LessonDto)
  @Expose()
  lessons: LessonDto[];
}

// Lesson DTOs
import { EnumField, EnumFieldOptional } from '@/decorators/field.decorators';
import { LessonType } from '../entities/lesson.entity';

export class CreateLessonDto {
  @StringField({ description: 'Lesson title' })
  title: string;

  @StringFieldOptional({ description: 'Lesson description' })
  description?: string;

  @EnumField(() => LessonType, {
    description: 'Type of lesson',
    default: LessonType.TEXT,
  })
  type: LessonType;

  @StringFieldOptional({
    description: 'Lesson content (text, HTML, or markdown)',
  })
  content?: string;

  @URLFieldOptional({ description: 'Video URL for video lessons' })
  videoUrl?: string;

  @URLFieldOptional({ description: 'Document URL for document lessons' })
  documentUrl?: string;

  @NumberFieldOptional({
    description: 'Lesson duration in minutes',
    min: 0,
  })
  duration?: number;

  @NumberFieldOptional({
    description: 'Order index of the lesson',
    min: 0,
  })
  orderIndex?: number;

  @BooleanFieldOptional({ description: 'Is the lesson active?', default: true })
  isActive?: boolean;

  @ApiProperty({
    description: 'Additional metadata',
    type: 'object',
    required: false,
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

export class UpdateLessonDto {
  @StringFieldOptional({ description: 'Lesson title' })
  title?: string;

  @StringFieldOptional({ description: 'Lesson description' })
  description?: string;

  @EnumFieldOptional(() => LessonType, { description: 'Type of lesson' })
  type?: LessonType;

  @StringFieldOptional({
    description: 'Lesson content (text, HTML, or markdown)',
  })
  content?: string;

  @URLFieldOptional({ description: 'Video URL for video lessons' })
  videoUrl?: string;

  @URLFieldOptional({ description: 'Document URL for document lessons' })
  documentUrl?: string;

  @NumberFieldOptional({
    description: 'Lesson duration in minutes',
    min: 0,
  })
  duration?: number;

  @NumberFieldOptional({
    description: 'Order index of the lesson',
    min: 0,
  })
  orderIndex?: number;

  @BooleanFieldOptional({ description: 'Is the lesson active?' })
  isActive?: boolean;

  @ApiProperty({
    description: 'Additional metadata',
    type: 'object',
    required: false,
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

@Exclude()
export class LessonDto {
  @StringField()
  @Expose()
  id: string;

  @StringField()
  @Expose()
  title: string;

  @StringFieldOptional()
  @Expose()
  description?: string;

  @EnumField(() => LessonType)
  @Expose()
  type: LessonType;

  @StringFieldOptional()
  @Expose()
  content?: string;

  @StringFieldOptional()
  @Expose()
  videoUrl?: string;

  @StringFieldOptional()
  @Expose()
  documentUrl?: string;

  @ApiProperty({ type: Number })
  @Expose()
  duration: number;

  @ApiProperty({ type: Number })
  @Expose()
  orderIndex: number;

  @ApiProperty({ type: Boolean })
  @Expose()
  isActive: boolean;

  @ApiProperty({ type: 'object', required: false })
  @Expose()
  metadata?: Record<string, any>;

  @StringField()
  @Expose()
  moduleId: string;

  @ClassField(() => Date)
  @Expose()
  createdAt: Date;

  @ClassField(() => Date)
  @Expose()
  updatedAt: Date;
}
