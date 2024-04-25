import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTables1714050816310 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE gestao.usuarios
            ADD CONSTRAINT fk_perfil_acesso
                FOREIGN KEY (perfil_acesso_id)
                REFERENCES gestao.perfis_acesso(id);

            ALTER TABLE gestao.usuarios
            ADD CONSTRAINT fk_empresa
                FOREIGN KEY (empresa_id)
                REFERENCES empresas(id);
        `, undefined);

        await queryRunner.query(`
            ALTER TABLE gestao.perfis_acesso
            ADD CONSTRAINT fk_usuario_criacao
                FOREIGN KEY (usuario_criacao_id)
                REFERENCES gestao.usuarios(id);
            
            ALTER TABLE gestao.perfis_acesso
            ADD CONSTRAINT fk_usuario_ultima_alteracao
                FOREIGN KEY (usuario_ultima_alteracao_id)
                REFERENCES gestao.usuarios(id);
        `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
