import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateApiKeyTable1764075000000 implements MigrationInterface {
  name = 'CreateApiKeyTable1764075000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "api_key" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "userId" uuid NOT NULL,
                "name" character varying(100) NOT NULL,
                "keyHash" character varying(255) NOT NULL,
                "lastUsedAt" TIMESTAMP,
                "expiresAt" TIMESTAMP,
                "isActive" boolean NOT NULL DEFAULT true,
                CONSTRAINT "UQ_api_key_keyHash" UNIQUE ("keyHash"),
                CONSTRAINT "PK_api_key" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_api_key_userId" ON "api_key" ("userId")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_api_key_keyHash" ON "api_key" ("keyHash")
        `);
    await queryRunner.query(`
            ALTER TABLE "api_key"
            ADD CONSTRAINT "FK_api_key_userId" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "api_key" DROP CONSTRAINT "FK_api_key_userId"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_api_key_keyHash"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_api_key_userId"
        `);
    await queryRunner.query(`
            DROP TABLE "api_key"
        `);
  }
}
