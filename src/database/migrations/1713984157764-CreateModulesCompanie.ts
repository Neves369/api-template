import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateModulesCompanie1713984157764 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE modulos_empresa (
                id SERIAL PRIMARY KEY,  
                empresa_id INTEGER NOT NULL, 
                modulo_id INTEGER NOT NULL,  
                FOREIGN KEY (empresa_id) REFERENCES  empresas(id) ON DELETE CASCADE,
                FOREIGN KEY (modulo_id) REFERENCES  modulos(id) ON DELETE CASCADE
            );`,
            undefined,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "modulos_empresa"`, undefined);
    }

}
