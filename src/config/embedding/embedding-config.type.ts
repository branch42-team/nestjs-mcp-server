export type EmbeddingConfig = {
  model: {
    name: string;
    dimensions: number;
    maxSequenceLength: number;
  };
  chunking: {
    maxChunkSize: number;
    chunkOverlap: number;
    strategy: 'semantic' | 'fixed' | 'hybrid';
  };
  search: {
    defaultK: number;
    maxK: number;
    cacheResults: boolean;
    cacheTTL: number;
  };
  indexing: {
    batchSize: number;
    concurrency: number;
  };
};
