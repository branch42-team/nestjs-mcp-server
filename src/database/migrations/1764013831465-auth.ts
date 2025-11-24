import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auth1764013831465 implements MigrationInterface {
  name = 'Auth1764013831465';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD "banned" boolean NOT NULL DEFAULT false
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD "banReason" character varying
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD "banExpires" TIMESTAMP
        `);
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "role"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."user_role_enum"
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD "role" character varying NOT NULL DEFAULT 'User'
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "role"
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."user_role_enum" AS ENUM('User', 'Admin')
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD "role" "public"."user_role_enum" NOT NULL DEFAULT 'User'
        `);
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "banExpires"
        `);
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "banReason"
        `);
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "banned"
        `);
  }
}
