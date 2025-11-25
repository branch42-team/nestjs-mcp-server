import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { LessonType } from '../entities/lesson.entity';

export class SearchQueryDto {
  @ApiProperty({
    description: 'Search query text',
    example: 'introduction to programming',
  })
  @IsString()
  query: string;

  @ApiPropertyOptional({
    description: 'Filter by course ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID()
  courseId?: string;

  @ApiPropertyOptional({
    description: 'Filter by module ID',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsOptional()
  @IsUUID()
  moduleId?: string;

  @ApiPropertyOptional({
    description: 'Filter by lesson type',
    enum: LessonType,
    example: LessonType.TEXT,
  })
  @IsOptional()
  @IsEnum(LessonType)
  lessonType?: LessonType;

  @ApiPropertyOptional({
    description: 'Minimum similarity score (0-1)',
    example: 0.7,
    minimum: 0,
    maximum: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  minSimilarity?: number;

  @ApiPropertyOptional({
    description: 'Maximum number of results to return',
    example: 10,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  @ApiPropertyOptional({
    description: 'Use hybrid search (semantic + keyword)',
    example: false,
  })
  @IsOptional()
  useHybrid?: boolean;
}

export class SearchResultItemDto {
  @ApiProperty({
    description: 'Lesson ID',
    example: '123e4567-e89b-12d3-a456-426614174002',
  })
  lessonId: string;

  @ApiProperty({
    description: 'Lesson title',
    example: 'Introduction to Variables',
  })
  lessonTitle: string;

  @ApiProperty({
    description: 'Matching content chunk',
    example:
      'Variables are containers for storing data values. In programming...',
  })
  chunkContent: string;

  @ApiProperty({
    description: 'Index of the chunk within the lesson',
    example: 0,
  })
  chunkIndex: number;

  @ApiProperty({
    description: 'Similarity score (0-1, higher is better)',
    example: 0.87,
  })
  similarity: number;

  @ApiPropertyOptional({
    description: 'Additional metadata about the chunk',
  })
  metadata?: any;

  @ApiPropertyOptional({
    description: 'Lesson details',
  })
  lesson?: {
    id: string;
    title: string;
    type: LessonType;
  };
}

export class SearchResponseDto {
  @ApiProperty({
    description: 'Array of search results',
    type: [SearchResultItemDto],
  })
  results: SearchResultItemDto[];

  @ApiProperty({
    description: 'Total number of results found',
    example: 15,
  })
  total: number;

  @ApiProperty({
    description: 'Search query used',
    example: 'introduction to programming',
  })
  query: string;

  @ApiPropertyOptional({
    description: 'Applied filters',
  })
  filters?: {
    courseId?: string;
    moduleId?: string;
    lessonType?: LessonType;
    minSimilarity?: number;
  };
}

export class SimilarLessonsDto {
  @ApiPropertyOptional({
    description: 'Maximum number of similar lessons to return',
    example: 5,
    minimum: 1,
    maximum: 20,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(20)
  limit?: number;
}
