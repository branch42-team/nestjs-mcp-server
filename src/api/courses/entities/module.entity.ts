import { BaseModel } from '@/database/models/base.model';
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { CourseEntity } from './course.entity';
import { LessonEntity } from './lesson.entity';

@Entity('module')
export class ModuleEntity extends BaseModel {
  @Index()
  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'int', default: 0 })
  orderIndex: number; // Order of the module within the course

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'uuid' })
  courseId: string;

  @ManyToOne(() => CourseEntity, (course) => course.modules, {
    onDelete: 'CASCADE',
  })
  course: CourseEntity;

  @OneToMany(() => LessonEntity, (lesson) => lesson.module, {
    cascade: true,
  })
  lessons: LessonEntity[];
}
