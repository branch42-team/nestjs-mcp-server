import { Job as AllJobs } from '@/constants/job.constant';
import { Job } from 'bullmq';

export const EmbeddingJobNames = AllJobs.Embedding;

export interface EmbedLessonData {
  lessonId: string;
  forceReindex?: boolean;
}

export interface EmbedCourseData {
  courseId: string;
  forceReindex?: boolean;
}

export interface ReindexAllData {
  forceReindex?: boolean;
  batchSize?: number;
}

export type EmbeddingJobData =
  | EmbedLessonData
  | EmbedCourseData
  | ReindexAllData;

export type EmbeddingJob = Job<
  EmbeddingJobData,
  any,
  (typeof EmbeddingJobNames)[keyof typeof EmbeddingJobNames]
>;
