import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTokens1713465641598 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE gestao.tokens (id SERIAL PRIMARY KEY, token VARCHAR(255) NOT NULL, usuario_id INTEGER, tipo tipo_token NOT NULL, expiracao TIMESTAMP NOT NULL, lista_negra BOOLEAN NOT NULL, FOREIGN KEY (usuario_id) REFERENCES  gestao.usuarios(id) ON DELETE CASCADE);`,
            undefined,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "gestao.tokens"`, undefined);
    }

}
