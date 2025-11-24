import { Queue } from '@/constants/job.constant';
import { EmbeddingModule } from '@/services/embedding/embedding.module';
import { EmbeddingQueueModule } from '@/worker/queues/embedding/embedding.module';
import { BullModule } from '@nestjs/bullmq';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesAdminController } from './courses-admin.controller';
import { CoursesRagController } from './courses-rag.controller';
import { CoursesRagService } from './courses-rag.service';
import { CoursesUserController } from './courses-user.controller';
import { CoursesService } from './courses.service';
import { CourseEntity } from './entities/course.entity';
import { EnrollmentEntity } from './entities/enrollment.entity';
import { LessonEmbeddingEntity } from './entities/lesson-embedding.entity';
import { LessonEntity } from './entities/lesson.entity';
import { ModuleEntity } from './entities/module.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CourseEntity,
      ModuleEntity,
      LessonEntity,
      EnrollmentEntity,
      LessonEmbeddingEntity,
    ]),
    BullModule.registerQueue({
      name: Queue.Embedding,
    }),
    CacheModule.register(),
    EmbeddingModule,
    EmbeddingQueueModule,
  ],
  controllers: [
    CoursesAdminController,
    CoursesUserController,
    CoursesRagController,
  ],
  providers: [CoursesService, CoursesRagService],
  exports: [CoursesService, CoursesRagService],
})
export class CoursesModule {}
