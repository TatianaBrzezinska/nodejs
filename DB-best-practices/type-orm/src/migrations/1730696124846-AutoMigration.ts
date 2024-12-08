import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1730696124846 implements MigrationInterface {
  name = "AutoMigration1730696124846";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "user"
                             (
                                 "id"       SERIAL            NOT NULL,
                                 "login"    character varying NOT NULL,
                                 "password" character varying NOT NULL,
                                 CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"),
                                 CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
                             )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
