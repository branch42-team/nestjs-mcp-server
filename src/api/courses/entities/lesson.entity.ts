import { BaseModel } from '@/database/models/base.model';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { ModuleEntity } from './module.entity';

export enum LessonType {
  VIDEO = 'video',
  TEXT = 'text',
  QUIZ = 'quiz',
  DOCUMENT = 'document',
}

@Entity('lesson')
export class LessonEntity extends BaseModel {
  @Index()
  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: LessonType,
    default: LessonType.TEXT,
  })
  type: LessonType;

  @Column({ type: 'text', nullable: true })
  content?: string; // Main content (text, HTML, or markdown)

  @Column({ nullable: true })
  videoUrl?: string; // URL for video lessons

  @Column({ nullable: true })
  documentUrl?: string; // URL for document lessons

  @Column({ type: 'int', default: 0 })
  duration: number; // Duration in minutes

  @Column({ type: 'int', default: 0 })
  orderIndex: number; // Order of the lesson within the module

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;

  @Column({ type: 'uuid' })
  moduleId: string;

  @ManyToOne(() => ModuleEntity, (module) => module.lessons, {
    onDelete: 'CASCADE',
  })
  module: ModuleEntity;
}
