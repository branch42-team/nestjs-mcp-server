import { LessonEmbeddingEntity } from '@/api/courses/entities/lesson-embedding.entity';
import { LessonEntity } from '@/api/courses/entities/lesson.entity';
import { ChunkingService } from '@/services/embedding/chunking.service';
import { EmbeddingService } from '@/services/embedding/embedding.service';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  EmbedCourseData,
  EmbedLessonData,
  ReindexAllData,
} from './embedding.type';

@Injectable()
export class EmbeddingQueueService {
  private readonly logger = new Logger(EmbeddingQueueService.name);

  constructor(
    @InjectRepository(LessonEntity)
    private readonly lessonRepository: Repository<LessonEntity>,
    @InjectRepository(LessonEmbeddingEntity)
    private readonly embeddingRepository: Repository<LessonEmbeddingEntity>,
    private readonly embeddingService: EmbeddingService,
    private readonly chunkingService: ChunkingService,
  ) {}

  /**
   * Process a single lesson and generate embeddings for its chunks
   */
  async embedLesson(data: EmbedLessonData): Promise<void> {
    const { lessonId, forceReindex = false } = data;

    this.logger.log(`Processing lesson: ${lessonId}`);

    // Fetch lesson
    const lesson = await this.lessonRepository.findOne({
      where: { id: lessonId },
    });

    if (!lesson) {
      throw new NotFoundException(`Lesson ${lessonId} not found`);
    }

    // Check if already embedded
    if (!forceReindex) {
      const existingCount = await this.embeddingRepository.count({
        where: { lessonId },
      });

      if (existingCount > 0) {
        this.logger.debug(
          `Lesson ${lessonId} already has embeddings, skipping`,
        );
        return;
      }
    } else {
      // Delete existing embeddings if forcing reindex
      await this.embeddingRepository.delete({ lessonId });
      this.logger.debug(`Deleted existing embeddings for lesson ${lessonId}`);
    }

    // Extract and chunk text
    const text = this.chunkingService.extractTextFromLesson({
      title: lesson.title,
      description: lesson.description,
      content: lesson.content,
      type: lesson.type,
    });

    if (!text || text.trim().length === 0) {
      this.logger.warn(`Lesson ${lessonId} has no content to embed`);
      return;
    }

    const chunks = this.chunkingService.chunkText(text);
    this.logger.log(`Generated ${chunks.length} chunks for lesson ${lessonId}`);

    if (chunks.length === 0) {
      this.logger.warn(`No chunks generated for lesson ${lessonId}`);
      return;
    }

    // Generate embeddings for each chunk
    const embeddings = await this.embeddingService.generateEmbeddingsBatch(
      chunks.map((c) => c.content),
    );

    // Save embeddings to database
    const embeddingEntities = chunks.map((chunk, index) => {
      const entity = this.embeddingRepository.create({
        lessonId,
        chunkIndex: chunk.index,
        content: chunk.content,
        embedding: embeddings[index],
      });
      (entity as any).metadata = {
        ...chunk.metadata,
        lessonType: lesson.type,
        contentType: 'text',
      };
      return entity;
    });

    await this.embeddingRepository.save(embeddingEntities);

    this.logger.log(
      `Successfully saved ${embeddingEntities.length} embeddings for lesson ${lessonId}`,
    );
  }

  /**
   * Process all lessons in a course
   */
  async embedCourse(data: EmbedCourseData): Promise<void> {
    const { courseId, forceReindex = false } = data;

    this.logger.log(`Processing course: ${courseId}`);

    // Fetch all lessons in the course
    const lessons = await this.lessonRepository
      .createQueryBuilder('lesson')
      .innerJoin('lesson.module', 'module')
      .where('module.courseId = :courseId', { courseId })
      .getMany();

    this.logger.log(`Found ${lessons.length} lessons in course ${courseId}`);

    // Process each lesson
    let successCount = 0;
    let errorCount = 0;

    for (const lesson of lessons) {
      try {
        await this.embedLesson({ lessonId: lesson.id, forceReindex });
        successCount++;
      } catch (error) {
        this.logger.error(
          `Error processing lesson ${lesson.id}:`,
          error.message,
        );
        errorCount++;
      }
    }

    this.logger.log(
      `Course ${courseId} processing complete. Success: ${successCount}, Errors: ${errorCount}`,
    );
  }

  /**
   * Reindex all lessons in the system
   */
  async reindexAll(data: ReindexAllData): Promise<void> {
    const { forceReindex = false, batchSize = 100 } = data;

    this.logger.log('Starting full reindex of all lessons');

    let offset = 0;
    let totalProcessed = 0;
    let totalErrors = 0;

    while (true) {
      const lessons = await this.lessonRepository.find({
        take: batchSize,
        skip: offset,
        order: { createdAt: 'ASC' },
      });

      if (lessons.length === 0) {
        break;
      }

      this.logger.log(
        `Processing batch: ${offset} to ${offset + lessons.length}`,
      );

      for (const lesson of lessons) {
        try {
          await this.embedLesson({ lessonId: lesson.id, forceReindex });
          totalProcessed++;
        } catch (error) {
          this.logger.error(
            `Error processing lesson ${lesson.id}:`,
            error.message,
          );
          totalErrors++;
        }
      }

      offset += batchSize;
    }

    this.logger.log(
      `Full reindex complete. Processed: ${totalProcessed}, Errors: ${totalErrors}`,
    );
  }

  /**
   * Get embedding statistics
   */
  async getEmbeddingStats(): Promise<{
    totalEmbeddings: number;
    totalLessons: number;
    lessonsWithEmbeddings: number;
    averageChunksPerLesson: number;
  }> {
    const [totalEmbeddings, lessonsWithEmbeddings] = await Promise.all([
      this.embeddingRepository.count(),
      this.embeddingRepository
        .createQueryBuilder('embedding')
        .select('COUNT(DISTINCT embedding.lessonId)', 'count')
        .getRawOne(),
    ]);

    const totalLessons = await this.lessonRepository.count();

    return {
      totalEmbeddings,
      totalLessons,
      lessonsWithEmbeddings: parseInt(lessonsWithEmbeddings.count, 10),
      averageChunksPerLesson:
        lessonsWithEmbeddings.count > 0
          ? totalEmbeddings / parseInt(lessonsWithEmbeddings.count, 10)
          : 0,
    };
  }
}
