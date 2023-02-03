import { MigrationInterface, QueryRunner } from "typeorm";

export class createUserProductsAndToken1675442740209 implements MigrationInterface {
    name = 'createUserProductsAndToken1675442740209'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tokens" DROP CONSTRAINT "TokenUser"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "price" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "created_at" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "updated_at" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_tokens" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "user_tokens" ADD "user_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_tokens" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "user_tokens" ADD "created_at" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_tokens" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "user_tokens" ADD "updated_at" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_99d90c2a483d79f3b627fb1d5e9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_99d90c2a483d79f3b627fb1d5e9"`);
        await queryRunner.query(`ALTER TABLE "user_tokens" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "user_tokens" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_tokens" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "user_tokens" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_tokens" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "user_tokens" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "price" TYPE numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "user_tokens" ADD CONSTRAINT "TokenUser" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
