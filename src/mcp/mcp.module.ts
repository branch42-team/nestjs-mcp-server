import { CoursesModule } from '@/api/courses/courses.module';
import { CourseEntity } from '@/api/courses/entities/course.entity';
import { EnrollmentEntity } from '@/api/courses/entities/enrollment.entity';
import { LessonEmbeddingEntity } from '@/api/courses/entities/lesson-embedding.entity';
import { LessonEntity } from '@/api/courses/entities/lesson.entity';
import { ModuleEntity } from '@/api/courses/entities/module.entity';
import { UserModule } from '@/api/user/user.module';
import { ApiKeyEntity } from '@/auth/entities/api-key.entity';
import { UserEntity } from '@/auth/entities/user.entity';
import { EmbeddingModule } from '@/services/embedding/embedding.module';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { McpEnrollmentGuard } from './guards/enrollment.guard';
import { CourseHandlers } from './handlers/course.handlers';
import { RagHandlers } from './handlers/rag.handlers';
import { McpServer } from './mcp.server';
import { McpAuthMiddleware } from './middleware/auth.middleware';

/**
 * MCP Module
 *
 * Provides Model Context Protocol server functionality for course management.
 * Includes authentication, authorization, and tool handlers.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ApiKeyEntity,
      CourseEntity,
      ModuleEntity,
      LessonEntity,
      EnrollmentEntity,
      LessonEmbeddingEntity,
    ]),
    CacheModule.register(),
    EmbeddingModule,
    CoursesModule,
    UserModule,
  ],
  providers: [
    McpServer,
    McpAuthMiddleware,
    McpEnrollmentGuard,
    CourseHandlers,
    RagHandlers,
  ],
  exports: [McpServer],
})
export class McpModule {}
