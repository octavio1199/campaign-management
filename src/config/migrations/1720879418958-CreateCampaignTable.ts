import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCampaignTable1720879418958 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "campaigns" (
        "id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "start_date" TIMESTAMP NOT NULL,
        "end_date" TIMESTAMP NOT NULL,
        "status" character varying NOT NULL,
        "category" character varying NOT NULL,
        "deleted" boolean NOT NULL DEFAULT false,
        CONSTRAINT "PK_3e7f3b7c7d5d3e6c7b8f3d3a3a9" PRIMARY KEY ("id")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "campaigns";');
  }
}
