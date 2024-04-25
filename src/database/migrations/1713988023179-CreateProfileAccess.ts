import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProfileAccess1713988023179 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE gestao.perfis_acesso (
                id SERIAL PRIMARY KEY,  
                descricao VARCHAR(100) NOT NULL, 
                data_criacao TIMESTAMP NOT NULL DEFAULT now(), 
                data_ultima_atualizacao TIMESTAMP NOT NULL DEFAULT now(),
                empresa_id INTEGER NOT NULL,
                usuario_criacao_id INTEGER NOT NULL,
                usuario_ultima_alteracao_id INTEGER NOT NULL,
                CONSTRAINT perfis_acesso_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES empresas(id) ON DELETE CASCADE
            );`,
            undefined,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "gestao.perfis_acesso"`, undefined);
    }

}
