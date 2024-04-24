import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePermissionsProfileAccess1713988821239 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE gestao.permissoes_perfil_acesso (
                id SERIAL PRIMARY KEY,  
                permissao_id INTEGER NOT NULL, 
                perfil_acesso_id INTEGER NOT NULL,  
                FOREIGN KEY (permissao_id) REFERENCES  gestao.permissoes(id) ON DELETE CASCADE,
                FOREIGN KEY (perfil_acesso_id) REFERENCES  gestao.perfis_acesso(id) ON DELETE CASCADE
            );`,
            undefined,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "gestao.permissoes_perfil_acesso"`, undefined);
    }

}
