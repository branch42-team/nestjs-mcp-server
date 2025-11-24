import { UserEntity } from '@/auth/entities/user.entity';
import { BaseModel } from '@/database/models/base.model';
import { Column, Entity, Index, ManyToOne, Relation, Unique } from 'typeorm';

export enum EnrollmentStatus {
  ENROLLED = 'enrolled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  SUSPENDED = 'suspended',
}

@Entity('enrollment')
@Unique(['userId', 'courseId'])
export class EnrollmentEntity extends BaseModel {
  @Index()
  @Column({ type: 'uuid' })
  userId: string;

  @Index()
  @Column({ type: 'uuid' })
  courseId: string;

  @Column({
    type: 'enum',
    enum: EnrollmentStatus,
    default: EnrollmentStatus.ENROLLED,
  })
  status: EnrollmentStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  enrolledAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  completedAt?: Date;

  @Column({ type: 'int', default: 0 })
  progressPercentage: number; // 0-100

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>; // Store lesson progress, quiz scores, etc.

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  user: UserEntity;

  @ManyToOne('CourseEntity', (course: any) => course.enrollments, {
    onDelete: 'CASCADE',
  })
  course: Relation<any>;
}
