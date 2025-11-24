import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChunkingService } from './chunking.service';
import { EmbeddingService } from './embedding.service';

@Module({
  imports: [ConfigModule, CacheModule.register()],
  providers: [EmbeddingService, ChunkingService],
  exports: [EmbeddingService, ChunkingService],
})
export class EmbeddingModule {}
