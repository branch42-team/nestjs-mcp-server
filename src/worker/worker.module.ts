import { Module } from '@nestjs/common';
import { EmailQueueModule } from './queues/email/email.module';
import { EmbeddingQueueModule } from './queues/embedding/embedding.module';

@Module({
  imports: [EmailQueueModule, EmbeddingQueueModule],
})
export class WorkerModule {}
