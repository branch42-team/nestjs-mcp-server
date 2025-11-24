import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeUsernameNullable1764014136524 implements MigrationInterface {
  name = 'MakeUsernameNullable1764014136524';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX "public"."IDX_070157ac5f9096d1a00bab15aa"
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "username" DROP NOT NULL
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_7bfc6ef77898a2bee078fbbef5" ON "user" ("username")
            WHERE "deletedAt" IS NULL
                AND "username" IS NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX "public"."IDX_7bfc6ef77898a2bee078fbbef5"
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "username"
            SET NOT NULL
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_070157ac5f9096d1a00bab15aa" ON "user" ("username")
            WHERE ("deletedAt" IS NULL)
        `);
  }
}
