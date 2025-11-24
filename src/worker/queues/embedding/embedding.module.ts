import { LessonEmbeddingEntity } from '@/api/courses/entities/lesson-embedding.entity';
import { LessonEntity } from '@/api/courses/entities/lesson.entity';
import { Queue } from '@/constants/job.constant';
import { EmbeddingModule } from '@/services/embedding/embedding.module';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmbeddingProcessor } from './embedding.processor';
import { EmbeddingQueueService } from './embedding.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LessonEntity, LessonEmbeddingEntity]),
    BullModule.registerQueue({
      name: Queue.Embedding,
      streams: {
        events: {
          maxLen: 1000,
        },
      },
    }),
    EmbeddingModule,
  ],
  providers: [EmbeddingQueueService, EmbeddingProcessor],
  exports: [EmbeddingQueueService],
})
export class EmbeddingQueueModule {}
