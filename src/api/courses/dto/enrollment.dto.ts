import {
  ClassField,
  EnumField,
  NumberField,
  StringField,
  UUIDField,
} from '@/decorators/field.decorators';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsObject, IsOptional } from 'class-validator';
import { EnrollmentStatus } from '../entities/enrollment.entity';
import { CourseDto } from './course.dto';

export class EnrollUserDto {
  @UUIDField({ description: 'User ID to enroll' })
  userId: string;
}

export class UpdateEnrollmentDto {
  @EnumField(() => EnrollmentStatus, {
    description: 'Enrollment status',
    required: false,
  })
  status?: EnrollmentStatus;

  @NumberField({
    description: 'Progress percentage (0-100)',
    min: 0,
    max: 100,
    required: false,
  })
  progressPercentage?: number;

  @ApiProperty({
    description: 'Additional metadata (lesson progress, quiz scores, etc.)',
    type: 'object',
    required: false,
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

@Exclude()
export class EnrollmentDto {
  @StringField()
  @Expose()
  id: string;

  @UUIDField()
  @Expose()
  userId: string;

  @UUIDField()
  @Expose()
  courseId: string;

  @EnumField(() => EnrollmentStatus)
  @Expose()
  status: EnrollmentStatus;

  @ClassField(() => Date)
  @Expose()
  enrolledAt: Date;

  @ClassField(() => Date)
  @Expose()
  completedAt?: Date;

  @NumberField()
  @Expose()
  progressPercentage: number;

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
export class EnrollmentWithCourseDto extends EnrollmentDto {
  @ApiProperty({ type: () => CourseDto })
  @Type(() => CourseDto)
  @Expose()
  course: CourseDto;
}
