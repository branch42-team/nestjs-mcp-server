import { EmbeddingConfig } from '@/config/embedding/embedding-config.type';
import { EmbeddingService } from '@/services/embedding/embedding.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';
import { LessonEmbeddingEntity } from './entities/lesson-embedding.entity';
import { LessonEntity, LessonType } from './entities/lesson.entity';

export interface SearchFilters {
  courseId?: string;
  moduleId?: string;
  lessonType?: LessonType;
  minSimilarity?: number;
}

export interface SearchResult {
  lessonId: string;
  lessonTitle: string;
  chunkContent: string;
  chunkIndex: number;
  similarity: number;
  metadata?: any;
  lesson?: LessonEntity;
}

@Injectable()
export class CoursesRagService {
  private readonly logger = new Logger(CoursesRagService.name);
  private readonly config: EmbeddingConfig;

  constructor(
    @InjectRepository(LessonEmbeddingEntity)
    private embeddingRepository: Repository<LessonEmbeddingEntity>,
    @InjectRepository(LessonEntity)
    private lessonRepository: Repository<LessonEntity>,
    private readonly embeddingService: EmbeddingService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {
    this.config = this.configService.get<EmbeddingConfig>('embedding', {
      infer: true,
    })!;
  }

  /**
   * Semantic search using vector similarity
   */
  async semanticSearch(
    query: string,
    filters: SearchFilters = {},
    limit: number = this.config.search.defaultK,
  ): Promise<SearchResult[]> {
    this.logger.log(`Performing semantic search for query: "${query}"`);

    // Validate limit
    const searchLimit = Math.min(limit, this.config.search.maxK);

    // Check cache if enabled
    if (this.config.search.cacheResults) {
      const cacheKey = this.getSearchCacheKey(query, filters, searchLimit);
      const cached = await this.cacheManager.get<SearchResult[]>(cacheKey);
      if (cached) {
        this.logger.debug('Search results retrieved from cache');
        return cached;
      }
    }

    // Generate embedding for the query
    const queryEmbedding = await this.embeddingService.generateEmbedding(query);

    // Build the query
    let queryBuilder = this.embeddingRepository
      .createQueryBuilder('embedding')
      .select([
        'embedding.id',
        'embedding.lessonId',
        'embedding.chunkIndex',
        'embedding.content',
        'embedding.metadata',
      ])
      .innerJoin('embedding.lesson', 'lesson')
      .addSelect(['lesson.id', 'lesson.title', 'lesson.type'])
      .where('lesson.isActive = :isActive', { isActive: true })
      .andWhere('lesson.deletedAt IS NULL');

    // Apply filters
    if (filters.lessonType) {
      queryBuilder = queryBuilder.andWhere('lesson.type = :lessonType', {
        lessonType: filters.lessonType,
      });
    }

    if (filters.moduleId) {
      queryBuilder = queryBuilder.andWhere('lesson.moduleId = :moduleId', {
        moduleId: filters.moduleId,
      });
    }

    if (filters.courseId) {
      queryBuilder = queryBuilder
        .innerJoin('lesson.module', 'module')
        .andWhere('module.courseId = :courseId', {
          courseId: filters.courseId,
        });
    }

    // Add vector similarity search using cosine distance
    // Note: <=> operator returns distance (0 = identical, 2 = opposite)
    // We convert to similarity score: 1 - (distance / 2)
    queryBuilder = queryBuilder
      .addSelect(
        `1 - (embedding.embedding <=> '[${queryEmbedding.join(',')}]'::vector) / 2`,
        'similarity',
      )
      .orderBy('similarity', 'DESC')
      .limit(searchLimit);

    const results = await queryBuilder.getRawAndEntities();

    // Map results to SearchResult format
    const searchResults: SearchResult[] = results.entities.map(
      (entity, index) => {
        const rawResult = results.raw[index];
        const similarity = parseFloat(rawResult.similarity);

        return {
          lessonId: entity.lessonId,
          lessonTitle: entity.lesson.title,
          chunkContent: entity.content,
          chunkIndex: entity.chunkIndex,
          similarity,
          metadata: entity.metadata,
          lesson: entity.lesson,
        };
      },
    );

    // Filter by minimum similarity if specified
    const filteredResults = filters.minSimilarity
      ? searchResults.filter((r) => r.similarity >= filters.minSimilarity!)
      : searchResults;

    // Cache the results if enabled
    if (this.config.search.cacheResults) {
      const cacheKey = this.getSearchCacheKey(query, filters, searchLimit);
      await this.cacheManager.set(
        cacheKey,
        filteredResults,
        this.config.search.cacheTTL * 1000,
      );
    }

    this.logger.log(
      `Found ${filteredResults.length} results for query: "${query}"`,
    );

    return filteredResults;
  }

  /**
   * Hybrid search combining semantic and keyword search
   */
  async hybridSearch(
    query: string,
    filters: SearchFilters = {},
    limit: number = this.config.search.defaultK,
  ): Promise<SearchResult[]> {
    this.logger.log(`Performing hybrid search for query: "${query}"`);

    // Get semantic search results
    const semanticResults = await this.semanticSearch(query, filters, limit);

    // Get keyword search results
    const keywordResults = await this.keywordSearch(query, filters, limit);

    // Merge using Reciprocal Rank Fusion (RRF)
    const mergedResults = this.reciprocalRankFusion(
      [semanticResults, keywordResults],
      limit,
    );

    return mergedResults;
  }

  /**
   * Keyword search using PostgreSQL full-text search
   */
  private async keywordSearch(
    query: string,
    filters: SearchFilters = {},
    limit: number = this.config.search.defaultK,
  ): Promise<SearchResult[]> {
    let queryBuilder = this.embeddingRepository
      .createQueryBuilder('embedding')
      .select([
        'embedding.id',
        'embedding.lessonId',
        'embedding.chunkIndex',
        'embedding.content',
        'embedding.metadata',
      ])
      .innerJoin('embedding.lesson', 'lesson')
      .addSelect(['lesson.id', 'lesson.title', 'lesson.type'])
      .where('lesson.isActive = :isActive', { isActive: true })
      .andWhere('lesson.deletedAt IS NULL');

    // Apply filters
    if (filters.lessonType) {
      queryBuilder = queryBuilder.andWhere('lesson.type = :lessonType', {
        lessonType: filters.lessonType,
      });
    }

    if (filters.moduleId) {
      queryBuilder = queryBuilder.andWhere('lesson.moduleId = :moduleId', {
        moduleId: filters.moduleId,
      });
    }

    if (filters.courseId) {
      queryBuilder = queryBuilder
        .innerJoin('lesson.module', 'module')
        .andWhere('module.courseId = :courseId', {
          courseId: filters.courseId,
        });
    }

    // Full-text search on content
    queryBuilder = queryBuilder
      .andWhere(
        `to_tsvector('english', embedding.content) @@ plainto_tsquery('english', :query)`,
        { query },
      )
      .addSelect(
        `ts_rank(to_tsvector('english', embedding.content), plainto_tsquery('english', :query))`,
        'rank',
      )
      .orderBy('rank', 'DESC')
      .limit(limit);

    const results = await queryBuilder.getRawAndEntities();

    return results.entities.map((entity, index) => {
      const rawResult = results.raw[index];
      const rank = parseFloat(rawResult.rank);

      return {
        lessonId: entity.lessonId,
        lessonTitle: entity.lesson.title,
        chunkContent: entity.content,
        chunkIndex: entity.chunkIndex,
        similarity: rank, // Using rank as similarity score
        metadata: entity.metadata,
        lesson: entity.lesson,
      };
    });
  }

  /**
   * Merge multiple result sets using Reciprocal Rank Fusion
   */
  private reciprocalRankFusion(
    resultSets: SearchResult[][],
    limit: number,
  ): SearchResult[] {
    const k = 60; // RRF constant
    const scoreMap = new Map<string, { result: SearchResult; score: number }>();

    resultSets.forEach((results) => {
      results.forEach((result, rank) => {
        const key = `${result.lessonId}-${result.chunkIndex}`;
        const rrfScore = 1 / (k + rank + 1);

        if (scoreMap.has(key)) {
          const existing = scoreMap.get(key)!;
          existing.score += rrfScore;
        } else {
          scoreMap.set(key, { result, score: rrfScore });
        }
      });
    });

    // Sort by RRF score and return top results
    return Array.from(scoreMap.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((item) => ({
        ...item.result,
        similarity: item.score, // Use RRF score as similarity
      }));
  }

  /**
   * Find similar lessons based on a lesson's content
   */
  async findSimilarLessons(
    lessonId: string,
    limit: number = 5,
  ): Promise<SearchResult[]> {
    this.logger.log(`Finding similar lessons for lesson: ${lessonId}`);

    // Get the lesson's embeddings
    const lessonEmbeddings = await this.embeddingRepository.find({
      where: { lessonId },
      take: 3, // Use top 3 chunks as representative
    });

    if (lessonEmbeddings.length === 0) {
      this.logger.warn(`No embeddings found for lesson ${lessonId}`);
      return [];
    }

    // Average the embeddings to get a representative vector
    const avgEmbedding = this.averageEmbeddings(
      lessonEmbeddings.map((e) => e.embedding),
    );

    // Search for similar chunks (excluding the original lesson)
    const results = await this.embeddingRepository
      .createQueryBuilder('embedding')
      .select([
        'embedding.id',
        'embedding.lessonId',
        'embedding.chunkIndex',
        'embedding.content',
        'embedding.metadata',
      ])
      .innerJoin('embedding.lesson', 'lesson')
      .addSelect(['lesson.id', 'lesson.title', 'lesson.type'])
      .where('lesson.isActive = :isActive', { isActive: true })
      .andWhere('lesson.deletedAt IS NULL')
      .andWhere('embedding.lessonId != :lessonId', { lessonId })
      .addSelect(
        `1 - (embedding.embedding <=> '[${avgEmbedding.join(',')}]'::vector) / 2`,
        'similarity',
      )
      .orderBy('similarity', 'DESC')
      .limit(limit)
      .getRawAndEntities();

    return results.entities.map((entity, index) => {
      const rawResult = results.raw[index];
      const similarity = parseFloat(rawResult.similarity);

      return {
        lessonId: entity.lessonId,
        lessonTitle: entity.lesson.title,
        chunkContent: entity.content,
        chunkIndex: entity.chunkIndex,
        similarity,
        metadata: entity.metadata,
        lesson: entity.lesson,
      };
    });
  }

  /**
   * Average multiple embeddings
   */
  private averageEmbeddings(embeddings: number[][]): number[] {
    if (embeddings.length === 0) return [];
    if (embeddings.length === 1) return embeddings[0];

    const dimensions = embeddings[0].length;
    const avg = new Array(dimensions).fill(0);

    for (const embedding of embeddings) {
      for (let i = 0; i < dimensions; i++) {
        avg[i] += embedding[i];
      }
    }

    return avg.map((v) => v / embeddings.length);
  }

  /**
   * Generate cache key for search results
   */
  private getSearchCacheKey(
    query: string,
    filters: SearchFilters,
    limit: number,
  ): string {
    const key = JSON.stringify({ query, filters, limit });
    const hash = crypto.createHash('sha256').update(key).digest('hex');
    return `search:${hash}`;
  }

  /**
   * Clear search cache
   */
  async clearSearchCache(): Promise<void> {
    this.logger.log('Clearing search cache');
    await this.cacheManager.reset();
  }
}
