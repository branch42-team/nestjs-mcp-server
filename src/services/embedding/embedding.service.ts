import { EmbeddingConfig } from '@/config/embedding/embedding-config.type';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FeatureExtractionPipeline, pipeline } from '@xenova/transformers';
import { Cache } from 'cache-manager';
import * as crypto from 'crypto';

@Injectable()
export class EmbeddingService {
  private readonly logger = new Logger(EmbeddingService.name);
  private readonly config: EmbeddingConfig;
  private pipelineInstance: FeatureExtractionPipeline | null = null;
  private modelLoadPromise: Promise<FeatureExtractionPipeline> | null = null;

  constructor(
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {
    this.config = this.configService.get<EmbeddingConfig>('embedding', {
      infer: true,
    })!;
  }

  /**
   * Initialize the embedding model (lazy loading)
   */
  private async loadModel(): Promise<FeatureExtractionPipeline> {
    if (this.pipelineInstance) {
      return this.pipelineInstance;
    }

    if (this.modelLoadPromise) {
      return this.modelLoadPromise;
    }

    this.modelLoadPromise = (async () => {
      this.logger.log(`Loading embedding model: ${this.config.model.name}...`);
      const startTime = Date.now();

      const pipe = await pipeline(
        'feature-extraction',
        this.config.model.name,
        {
          quantized: true, // Use quantized model for better performance
        },
      );

      const loadTime = Date.now() - startTime;
      this.logger.log(`Embedding model loaded successfully in ${loadTime}ms`);

      this.pipelineInstance = pipe;
      return pipe;
    })();

    return this.modelLoadPromise;
  }

  /**
   * Generate embedding for a single text
   */
  async generateEmbedding(text: string): Promise<number[]> {
    if (!text || text.trim().length === 0) {
      throw new Error('Text cannot be empty');
    }

    // Check cache first if enabled
    if (this.config.search.cacheResults) {
      const cacheKey = this.getCacheKey(text);
      const cached = await this.cacheManager.get<number[]>(cacheKey);
      if (cached) {
        this.logger.debug('Embedding retrieved from cache');
        return cached;
      }
    }

    const model = await this.loadModel();

    try {
      // Truncate text if too long
      const truncatedText = this.truncateText(text);

      // Generate embedding
      const output = await model(truncatedText, {
        pooling: 'mean',
        normalize: true,
      });

      // Convert to array and extract data
      const embedding = Array.from(output.data) as number[];

      // Validate embedding dimensions
      if (embedding.length !== this.config.model.dimensions) {
        throw new Error(
          `Expected ${this.config.model.dimensions} dimensions, got ${embedding.length}`,
        );
      }

      // Cache the result if enabled
      if (this.config.search.cacheResults) {
        const cacheKey = this.getCacheKey(text);
        await this.cacheManager.set(
          cacheKey,
          embedding,
          this.config.search.cacheTTL * 1000,
        );
      }

      return embedding;
    } catch (error) {
      this.logger.error('Error generating embedding:', error);
      throw error;
    }
  }

  /**
   * Generate embeddings for multiple texts in batch
   */
  async generateEmbeddingsBatch(texts: string[]): Promise<number[][]> {
    if (!texts || texts.length === 0) {
      return [];
    }

    const batchSize = this.config.indexing.batchSize;
    const results: number[][] = [];

    // Process in batches to avoid memory issues
    for (let i = 0; i < texts.length; i += batchSize) {
      const batch = texts.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map((text) => this.generateEmbedding(text)),
      );
      results.push(...batchResults);

      this.logger.debug(
        `Processed batch ${i / batchSize + 1}/${Math.ceil(texts.length / batchSize)}`,
      );
    }

    return results;
  }

  /**
   * Calculate cosine similarity between two embeddings
   */
  cosineSimilarity(embedding1: number[], embedding2: number[]): number {
    if (embedding1.length !== embedding2.length) {
      throw new Error('Embeddings must have the same dimensions');
    }

    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;

    for (let i = 0; i < embedding1.length; i++) {
      dotProduct += embedding1[i] * embedding2[i];
      norm1 += embedding1[i] * embedding1[i];
      norm2 += embedding2[i] * embedding2[i];
    }

    return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
  }

  /**
   * Truncate text to model's max sequence length
   */
  private truncateText(text: string): string {
    // Rough estimation: 1 token ≈ 4 characters
    const maxChars = this.config.model.maxSequenceLength * 4;
    if (text.length > maxChars) {
      this.logger.debug(
        `Truncating text from ${text.length} to ${maxChars} characters`,
      );
      return text.substring(0, maxChars);
    }
    return text;
  }

  /**
   * Generate cache key from text content
   */
  private getCacheKey(text: string): string {
    const hash = crypto.createHash('sha256').update(text).digest('hex');
    return `embedding:${hash}`;
  }

  /**
   * Clear all embedding caches
   */
  async clearCache(): Promise<void> {
    this.logger.log('Clearing embedding cache');
    await this.cacheManager.reset();
  }

  /**
   * Get model information
   */
  getModelInfo(): {
    name: string;
    dimensions: number;
    maxSequenceLength: number;
    loaded: boolean;
  } {
    return {
      name: this.config.model.name,
      dimensions: this.config.model.dimensions,
      maxSequenceLength: this.config.model.maxSequenceLength,
      loaded: this.pipelineInstance !== null,
    };
  }
}
