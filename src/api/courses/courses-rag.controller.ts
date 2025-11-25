import { AuthGuard } from '@/auth/auth.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoursesRagService } from './courses-rag.service';
import {
  SearchQueryDto,
  SearchResponseDto,
  SimilarLessonsDto,
} from './dto/search.dto';
import { EnrollmentGuard } from './guards/enrollment.guard';
import { SkipEnrollmentCheck } from './guards/skip-enrollment-check.decorator';

@ApiTags('RAG Search')
@Controller('api')
@UseGuards(AuthGuard, EnrollmentGuard)
export class CoursesRagController {
  constructor(private readonly ragService: CoursesRagService) {}

  @Post('courses/search')
  @ApiOperation({
    summary: 'Semantic search across all courses',
    description:
      'Search for lessons using semantic similarity. Returns matching lesson chunks ranked by relevance.',
  })
  @ApiResponse({
    status: 200,
    description: 'Search results',
    type: SearchResponseDto,
  })
  @SkipEnrollmentCheck()
  async searchAllCourses(
    @Body() searchDto: SearchQueryDto,
  ): Promise<SearchResponseDto> {
    const {
      query,
      courseId,
      moduleId,
      lessonType,
      minSimilarity,
      limit,
      useHybrid,
    } = searchDto;

    const filters = {
      courseId,
      moduleId,
      lessonType,
      minSimilarity,
    };

    const results = useHybrid
      ? await this.ragService.hybridSearch(query, filters, limit || 10)
      : await this.ragService.semanticSearch(query, filters, limit || 10);

    return {
      results: results.map((r) => ({
        lessonId: r.lessonId,
        lessonTitle: r.lessonTitle,
        chunkContent: r.chunkContent,
        chunkIndex: r.chunkIndex,
        similarity: r.similarity,
        metadata: r.metadata,
        lesson: r.lesson
          ? {
              id: r.lesson.id,
              title: r.lesson.title,
              type: r.lesson.type,
            }
          : undefined,
      })),
      total: results.length,
      query,
      filters,
    };
  }

  @Post('courses/:courseId/search')
  @ApiOperation({
    summary: 'Search within a specific course',
    description:
      'Perform semantic search limited to lessons within a specific course.',
  })
  @ApiResponse({
    status: 200,
    description: 'Search results',
    type: SearchResponseDto,
  })
  async searchCourse(
    @Param('courseId') courseId: string,
    @Body() searchDto: Omit<SearchQueryDto, 'courseId'>,
  ): Promise<SearchResponseDto> {
    const { query, moduleId, lessonType, minSimilarity, limit, useHybrid } =
      searchDto;

    const filters = {
      courseId,
      moduleId,
      lessonType,
      minSimilarity,
    };

    const results = useHybrid
      ? await this.ragService.hybridSearch(query, filters, limit || 10)
      : await this.ragService.semanticSearch(query, filters, limit || 10);

    return {
      results: results.map((r) => ({
        lessonId: r.lessonId,
        lessonTitle: r.lessonTitle,
        chunkContent: r.chunkContent,
        chunkIndex: r.chunkIndex,
        similarity: r.similarity,
        metadata: r.metadata,
        lesson: r.lesson
          ? {
              id: r.lesson.id,
              title: r.lesson.title,
              type: r.lesson.type,
            }
          : undefined,
      })),
      total: results.length,
      query,
      filters,
    };
  }

  @Get('lessons/:lessonId/similar')
  @ApiOperation({
    summary: 'Find similar lessons',
    description:
      'Get lessons with similar content based on semantic similarity.',
  })
  @ApiResponse({
    status: 200,
    description: 'Similar lessons',
    type: SearchResponseDto,
  })
  async getSimilarLessons(
    @Param('lessonId') lessonId: string,
    @Query() dto: SimilarLessonsDto,
  ): Promise<SearchResponseDto> {
    const results = await this.ragService.findSimilarLessons(
      lessonId,
      dto.limit || 5,
    );

    return {
      results: results.map((r) => ({
        lessonId: r.lessonId,
        lessonTitle: r.lessonTitle,
        chunkContent: r.chunkContent,
        chunkIndex: r.chunkIndex,
        similarity: r.similarity,
        metadata: r.metadata,
        lesson: r.lesson
          ? {
              id: r.lesson.id,
              title: r.lesson.title,
              type: r.lesson.type,
            }
          : undefined,
      })),
      total: results.length,
      query: `Similar to lesson ${lessonId}`,
      filters: {},
    };
  }
}
