import { BaseModel } from '@/database/models/base.model';
import { Column, Entity, Index, OneToMany, Relation } from 'typeorm';
import { ModuleEntity } from './module.entity';

@Entity('course')
export class CourseEntity extends BaseModel {
  @Index()
  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true, type: 'text' })
  thumbnailUrl?: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'int', default: 0 })
  duration: number; // Duration in minutes

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;

  @OneToMany(() => ModuleEntity, (module) => module.course, {
    cascade: true,
  })
  modules: ModuleEntity[];

  @OneToMany('EnrollmentEntity', (enrollment: any) => enrollment.course)
  enrollments: Relation<any[]>;
}
