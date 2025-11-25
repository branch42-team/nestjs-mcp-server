import { EmbeddingConfig } from '@/config/embedding/embedding-config.type';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface TextChunk {
  content: string;
  index: number;
  metadata: {
    startPosition: number;
    endPosition: number;
    tokenCount?: number;
    chunkingStrategy: string;
  };
}

@Injectable()
export class ChunkingService {
  private readonly logger = new Logger(ChunkingService.name);
  private readonly config: EmbeddingConfig['chunking'];

  constructor(private readonly configService: ConfigService) {
    this.config = this.configService.get<EmbeddingConfig['chunking']>(
      'embedding.chunking',
      { infer: true },
    )!;
  }

  /**
   * Split text into chunks using hybrid strategy (semantic + size limits)
   */
  chunkText(text: string): TextChunk[] {
    if (!text || text.trim().length === 0) {
      return [];
    }

    switch (this.config.strategy) {
      case 'semantic':
        return this.semanticChunking(text);
      case 'fixed':
        return this.fixedSizeChunking(text);
      case 'hybrid':
      default:
        return this.hybridChunking(text);
    }
  }

  /**
   * Semantic chunking - split by paragraphs and headings
   */
  private semanticChunking(text: string): TextChunk[] {
    const chunks: TextChunk[] = [];
    let currentPosition = 0;

    // Split by double newlines (paragraphs) and markdown headings
    const segments = text.split(/\n\n+|(?=^#{1,6}\s)/m).filter((s) => s.trim());

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i].trim();
      const endPosition = currentPosition + segment.length;

      chunks.push({
        content: segment,
        index: i,
        metadata: {
          startPosition: currentPosition,
          endPosition: endPosition,
          chunkingStrategy: 'semantic',
        },
      });

      currentPosition = endPosition + 2; // Account for newlines
    }

    return chunks;
  }

  /**
   * Fixed size chunking with overlap
   */
  private fixedSizeChunking(text: string): TextChunk[] {
    const chunks: TextChunk[] = [];
    const maxSize = this.config.maxChunkSize;
    const overlap = this.config.chunkOverlap;
    const words = text.split(/\s+/);

    let index = 0;
    let position = 0;

    for (let i = 0; i < words.length; i += maxSize - overlap) {
      const chunkWords = words.slice(i, i + maxSize);
      const content = chunkWords.join(' ');
      const startPosition = position;
      const endPosition = startPosition + content.length;

      chunks.push({
        content,
        index: index++,
        metadata: {
          startPosition,
          endPosition,
          tokenCount: chunkWords.length,
          chunkingStrategy: 'fixed',
        },
      });

      position = endPosition + 1;
    }

    return chunks;
  }

  /**
   * Hybrid chunking - semantic splitting with size limits
   */
  private hybridChunking(text: string): TextChunk[] {
    const maxSize = this.config.maxChunkSize;
    const overlap = this.config.chunkOverlap;

    // First, do semantic splitting
    const semanticChunks = this.semanticChunking(text);
    const finalChunks: TextChunk[] = [];
    let chunkIndex = 0;

    for (const chunk of semanticChunks) {
      const wordCount = chunk.content.split(/\s+/).length;

      // If chunk is within size limit, keep it as is
      if (wordCount <= maxSize) {
        finalChunks.push({
          ...chunk,
          index: chunkIndex++,
          metadata: {
            ...chunk.metadata,
            tokenCount: wordCount,
            chunkingStrategy: 'hybrid',
          },
        });
      } else {
        // Split large chunks into smaller pieces with overlap
        const words = chunk.content.split(/\s+/);
        let position = chunk.metadata.startPosition;

        for (let i = 0; i < words.length; i += maxSize - overlap) {
          const chunkWords = words.slice(i, i + maxSize);
          const content = chunkWords.join(' ');
          const endPosition = position + content.length;

          finalChunks.push({
            content,
            index: chunkIndex++,
            metadata: {
              startPosition: position,
              endPosition: endPosition,
              tokenCount: chunkWords.length,
              chunkingStrategy: 'hybrid',
            },
          });

          position = endPosition + 1;
        }
      }
    }

    return finalChunks;
  }

  /**
   * Extract text from different lesson content types
   */
  extractTextFromLesson(lesson: {
    title: string;
    description?: string;
    content?: string;
    type: string;
  }): string {
    const parts: string[] = [];

    // Always include title
    if (lesson.title) {
      parts.push(`# ${lesson.title}`);
    }

    // Include description if available
    if (lesson.description) {
      parts.push(lesson.description);
    }

    // Include main content based on type
    if (lesson.content) {
      parts.push(lesson.content);
    }

    return parts.join('\n\n');
  }
}
