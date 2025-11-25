import { Job as AllJobs, Queue as QueueName } from '@/constants/job.constant';
import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { EmbeddingQueueService } from './embedding.service';
import {
  EmbedCourseData,
  EmbedLessonData,
  EmbeddingJob,
  ReindexAllData,
} from './embedding.type';

const EmbeddingJob = AllJobs.Embedding;

@Processor(QueueName.Embedding, {
  concurrency: 2, // Process 2 jobs at a time
  drainDelay: 300,
  stalledInterval: 300000,
  removeOnComplete: {
    age: 86400, // Keep completed jobs for 24 hours
    count: 100,
  },
  removeOnFail: {
    age: 604800, // Keep failed jobs for 7 days
  },
  limiter: {
    max: 5,
    duration: 1000,
  },
})
export class EmbeddingProcessor extends WorkerHost {
  private readonly logger = new Logger(EmbeddingProcessor.name);

  constructor(private readonly embeddingQueueService: EmbeddingQueueService) {
    super();
  }

  async process(job: EmbeddingJob, _token?: string): Promise<any> {
    this.logger.debug(`Processing job ${job.id} of type ${job.name}`);

    try {
      switch (job.name) {
        case EmbeddingJob.EmbedLesson:
          return await this.embeddingQueueService.embedLesson(
            job.data as EmbedLessonData,
          );

        case EmbeddingJob.EmbedCourse:
          return await this.embeddingQueueService.embedCourse(
            job.data as EmbedCourseData,
          );

        case EmbeddingJob.ReindexAll:
          return await this.embeddingQueueService.reindexAll(
            job.data as ReindexAllData,
          );

        default:
          throw new Error(`Unhandled job named: ${(job as any).name}`);
      }
    } catch (error) {
      this.logger.error(`Error processing job ${job.id}:`, error);
      throw error;
    }
  }

  @OnWorkerEvent('active')
  async onActive(job: Job) {
    this.logger.debug(`Job ${job.id} is now active`);
  }

  @OnWorkerEvent('progress')
  async onProgress(job: Job) {
    this.logger.debug(`Job ${job.id} is ${job.progress}% complete`);
  }

  @OnWorkerEvent('completed')
  async onCompleted(job: Job) {
    this.logger.log(`Job ${job.id} has been completed`);
  }

  @OnWorkerEvent('failed')
  async onFailed(job: Job) {
    this.logger.error(
      `Job ${job.id} has failed with reason: ${job.failedReason}`,
    );
    this.logger.error(job.stacktrace);
  }

  @OnWorkerEvent('stalled')
  async onStalled(job: Job) {
    this.logger.warn(`Job ${job.id} has been stalled`);
  }

  @OnWorkerEvent('error')
  async onError(job: Job, error: Error) {
    this.logger.error(`Job ${job.id} has failed with error: ${error.message}`);
  }
}
