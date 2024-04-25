import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsers1590521920166 implements MigrationInterface {
  name = 'CreateUsers1590521920166';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE gestao.usuarios (
        "id" SERIAL NOT NULL, 
        "nome_usuario" character varying(40), 
        "nome" character varying(40),
        "cpf" character varying(11), 
        "telefone" character varying(11), 
        "email" character varying(100) NOT NULL, 
        "senha" character varying(10) NOT NULL, 
        "sexo" character varying(1) NOT NULL,
        "role" character varying(30) NOT NULL DEFAULT 'STANDARD', 
        "data_cadatro" TIMESTAMP NOT NULL DEFAULT now(), 
        "data_ultima_atualizacao" TIMESTAMP NOT NULL DEFAULT now(),
        "usuario_ultima_alteracao_id" INTEGER REFERENCES gestao.usuarios(id),
        "empresa_id" INTEGER NOT NULL,
        "perfil_acesso_id" INTEGER NOT NULL, 
        status BOOLEAN NOT NULL DEFAULT true, 
        CONSTRAINT "usuarios_email_key" UNIQUE ("email"), 
        CONSTRAINT usuarios_pkey PRIMARY KEY (id),
        CONSTRAINT usuarios_cpf_key UNIQUE (cpf)
      )`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "gestao.usuarios"`, undefined);
  }
}
