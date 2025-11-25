import validateConfig from '@/utils/config/validate-config';
import { registerAs } from '@nestjs/config';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { EmbeddingConfig } from './embedding-config.type';

class EnvironmentVariablesValidator {
  @IsString()
  @IsOptional()
  EMBEDDING_MODEL: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  EMBEDDING_DIMENSIONS: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  EMBEDDING_MAX_SEQUENCE_LENGTH: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  EMBEDDING_CHUNK_SIZE: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  EMBEDDING_CHUNK_OVERLAP: number;

  @IsEnum(['semantic', 'fixed', 'hybrid'])
  @IsOptional()
  EMBEDDING_CHUNKING_STRATEGY: 'semantic' | 'fixed' | 'hybrid';

  @IsInt()
  @IsPositive()
  @IsOptional()
  EMBEDDING_DEFAULT_K: number;

  @IsInt()
  @IsPositive()
  @Max(1000)
  @IsOptional()
  EMBEDDING_MAX_K: number;

  @IsBoolean()
  @IsOptional()
  EMBEDDING_CACHE_RESULTS: boolean;

  @IsInt()
  @IsPositive()
  @IsOptional()
  EMBEDDING_CACHE_TTL: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  EMBEDDING_BATCH_SIZE: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  EMBEDDING_CONCURRENCY: number;
}

export function getConfig(): EmbeddingConfig {
  return {
    model: {
      name: process.env.EMBEDDING_MODEL || 'Xenova/all-MiniLM-L6-v2',
      dimensions: process.env.EMBEDDING_DIMENSIONS
        ? parseInt(process.env.EMBEDDING_DIMENSIONS, 10)
        : 384,
      maxSequenceLength: process.env.EMBEDDING_MAX_SEQUENCE_LENGTH
        ? parseInt(process.env.EMBEDDING_MAX_SEQUENCE_LENGTH, 10)
        : 512,
    },
    chunking: {
      maxChunkSize: process.env.EMBEDDING_CHUNK_SIZE
        ? parseInt(process.env.EMBEDDING_CHUNK_SIZE, 10)
        : 512,
      chunkOverlap: process.env.EMBEDDING_CHUNK_OVERLAP
        ? parseInt(process.env.EMBEDDING_CHUNK_OVERLAP, 10)
        : 50,
      strategy:
        (process.env.EMBEDDING_CHUNKING_STRATEGY as
          | 'semantic'
          | 'fixed'
          | 'hybrid') || 'hybrid',
    },
    search: {
      defaultK: process.env.EMBEDDING_DEFAULT_K
        ? parseInt(process.env.EMBEDDING_DEFAULT_K, 10)
        : 10,
      maxK: process.env.EMBEDDING_MAX_K
        ? parseInt(process.env.EMBEDDING_MAX_K, 10)
        : 100,
      cacheResults: process.env.EMBEDDING_CACHE_RESULTS === 'true',
      cacheTTL: process.env.EMBEDDING_CACHE_TTL
        ? parseInt(process.env.EMBEDDING_CACHE_TTL, 10)
        : 3600,
    },
    indexing: {
      batchSize: process.env.EMBEDDING_BATCH_SIZE
        ? parseInt(process.env.EMBEDDING_BATCH_SIZE, 10)
        : 10,
      concurrency: process.env.EMBEDDING_CONCURRENCY
        ? parseInt(process.env.EMBEDDING_CONCURRENCY, 10)
        : 5,
    },
  };
}

export default registerAs<EmbeddingConfig>('embedding', () => {
  // MCP mode uses stdio for protocol communication, so log to stderr
  // eslint-disable-next-line no-console
  console.error(`Registering EmbeddingConfig from environment variables`);
  validateConfig(process.env, EnvironmentVariablesValidator);
  return getConfig();
});
