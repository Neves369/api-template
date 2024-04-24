import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePermissions1713987604626 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE gestao.permissoes (
                id SERIAL PRIMARY KEY,  
                permissao tipo_permissao NOT NULL
            );`,
            undefined,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "gestao.permissoes"`, undefined);
    }

}
