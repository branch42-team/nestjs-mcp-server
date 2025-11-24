import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPgvectorEmbeddings1764021500000 implements MigrationInterface {
  name = 'AddPgvectorEmbeddings1764021500000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Enable pgvector extension
    await queryRunner.query(`
            CREATE EXTENSION IF NOT EXISTS vector
        `);

    // Create lesson_embedding table
    await queryRunner.query(`
            CREATE TABLE "lesson_embedding" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "lessonId" uuid NOT NULL,
                "chunkIndex" integer NOT NULL,
                "content" text NOT NULL,
                "embedding" vector(384) NOT NULL,
                "metadata" jsonb,
                CONSTRAINT "PK_lesson_embedding_id" PRIMARY KEY ("id")
            )
        `);

    // Create index on lessonId for faster lookups
    await queryRunner.query(`
            CREATE INDEX "IDX_lesson_embedding_lessonId" ON "lesson_embedding" ("lessonId")
        `);

    // Create index on chunk index for ordering
    await queryRunner.query(`
            CREATE INDEX "IDX_lesson_embedding_chunkIndex" ON "lesson_embedding" ("chunkIndex")
        `);

    // Create HNSW index for vector similarity search (efficient for large datasets)
    await queryRunner.query(`
            CREATE INDEX "IDX_lesson_embedding_vector_hnsw" ON "lesson_embedding" 
            USING hnsw (embedding vector_cosine_ops)
            WITH (m = 16, ef_construction = 64)
        `);

    // Add foreign key constraint
    await queryRunner.query(`
            ALTER TABLE "lesson_embedding"
            ADD CONSTRAINT "FK_lesson_embedding_lessonId" FOREIGN KEY ("lessonId") 
            REFERENCES "lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign key constraint
    await queryRunner.query(`
            ALTER TABLE "lesson_embedding" DROP CONSTRAINT "FK_lesson_embedding_lessonId"
        `);

    // Drop indexes
    await queryRunner.query(`
            DROP INDEX "public"."IDX_lesson_embedding_vector_hnsw"
        `);

    await queryRunner.query(`
            DROP INDEX "public"."IDX_lesson_embedding_chunkIndex"
        `);

    await queryRunner.query(`
            DROP INDEX "public"."IDX_lesson_embedding_lessonId"
        `);

    // Drop table
    await queryRunner.query(`
            DROP TABLE "lesson_embedding"
        `);

    // Note: We don't drop the vector extension as other tables might use it
    // If you're sure no other tables use it, uncomment the following:
    // await queryRunner.query(`DROP EXTENSION IF EXISTS vector`);
  }
}
