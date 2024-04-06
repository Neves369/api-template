import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsers1590521920166 implements MigrationInterface {
  name = 'CreateUsers1590521920166';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying(40), "name" character varying(40), "email" character varying(100) NOT NULL, "password" character varying NOT NULL, "role" character varying(30) NOT NULL DEFAULT 'STANDARD', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TYPE TokenTypes AS ENUM ('access','refresh','resetPassword','verifyEmail');`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE tokens (id SERIAL PRIMARY KEY, token VARCHAR(255) NOT NULL, user_id INTEGER, type TokenTypes NOT NULL, expires TIMESTAMP NOT NULL, blacklisted BOOLEAN NOT NULL, FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE);`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`, undefined);
    await queryRunner.query(`DROP TYPE "TokenTypes"`, undefined);
    await queryRunner.query(`DROP TABLE "tokens"`, undefined);
  }
}
