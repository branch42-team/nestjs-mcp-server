import { BaseModel } from '@/database/models/base.model';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { LessonEntity } from './lesson.entity';

export interface EmbeddingMetadata {
  startPosition?: number;
  endPosition?: number;
  contentType?: 'text' | 'description' | 'metadata' | 'title';
  lessonType?: string;
  tokenCount?: number;
  chunkingStrategy?: 'semantic' | 'fixed' | 'hybrid';
  [key: string]: any;
}

@Entity('lesson_embedding')
export class LessonEmbeddingEntity extends BaseModel {
  @Index()
  @Column({ type: 'uuid' })
  lessonId: string;

  @Column({ type: 'int' })
  chunkIndex: number;

  @Column({ type: 'text' })
  content: string;

  // Vector column for embeddings (dimension 384 for all-MiniLM-L6-v2)
  // TypeORM doesn't have native support for pgvector, so we use varchar with transformer
  // The actual column type is 'vector(384)' as created by the migration
  @Column({
    type: 'varchar',
    transformer: {
      to: (value: number[]) => (value ? `[${value.join(',')}]` : null),
      from: (value: string) =>
        value ? JSON.parse(value.replace(/\(/g, '[').replace(/\)/g, ']')) : [],
    },
  })
  embedding: number[];

  @Column({ type: 'jsonb', nullable: true })
  metadata?: EmbeddingMetadata;

  @ManyToOne(() => LessonEntity, { onDelete: 'CASCADE' })
  lesson: LessonEntity;
}
