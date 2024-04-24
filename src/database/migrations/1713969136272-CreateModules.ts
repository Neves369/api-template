import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateModules1713969136272 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE modulos (
                id SERIAL PRIMARY KEY,  
                modulo tipo_modulo NOT NULL
            );`,
            undefined,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "modulos"`, undefined);
    }

}
