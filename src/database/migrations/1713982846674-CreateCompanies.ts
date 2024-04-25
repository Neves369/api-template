import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCompanies1713982846674 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE empresas (
                id SERIAL PRIMARY KEY,  
                razao_social VARCHAR(100) NOT NULL, 
                nome_fantasia VARCHAR(100) NOT NULL, 
                cnpj VARCHAR(14) NOT NULL,  
                responsavel VARCHAR(100) NOT NULL,
                status BOOLEAN NOT NULL DEFAULT TRUE
            );`,
            undefined,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "empresas"`, undefined);
    }

}
