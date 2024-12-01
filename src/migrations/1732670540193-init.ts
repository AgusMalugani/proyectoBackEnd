import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1732670540193 implements MigrationInterface {
    name = 'Init1732670540193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "stock" integer NOT NULL, "imgUrl" character varying NOT NULL DEFAULT 'img-url', "categoryId" uuid, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_detail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" integer NOT NULL, CONSTRAINT "PK_0afbab1fa98e2fb0be8e74f6b38" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "orderDetailsId" uuid, "userId" uuid, CONSTRAINT "REL_ab56c88c3f324df235b657e9f6" UNIQUE ("orderDetailsId"), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "address" character varying NOT NULL, "phone" character varying NOT NULL, "country" character varying, "city" character varying, "isAdmin" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_detail_products_product" ("orderDetailId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_dbbdfa402a5b0a50659b6e9bd1d" PRIMARY KEY ("orderDetailId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ba400383a42d98a45c92d51277" ON "order_detail_products_product" ("orderDetailId") `);
        await queryRunner.query(`CREATE INDEX "IDX_93f8c696735d93f11b7f210bf0" ON "order_detail_products_product" ("productId") `);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_ab56c88c3f324df235b657e9f62" FOREIGN KEY ("orderDetailsId") REFERENCES "order_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_detail_products_product" ADD CONSTRAINT "FK_ba400383a42d98a45c92d512771" FOREIGN KEY ("orderDetailId") REFERENCES "order_detail"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order_detail_products_product" ADD CONSTRAINT "FK_93f8c696735d93f11b7f210bf09" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_detail_products_product" DROP CONSTRAINT "FK_93f8c696735d93f11b7f210bf09"`);
        await queryRunner.query(`ALTER TABLE "order_detail_products_product" DROP CONSTRAINT "FK_ba400383a42d98a45c92d512771"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_ab56c88c3f324df235b657e9f62"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_93f8c696735d93f11b7f210bf0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ba400383a42d98a45c92d51277"`);
        await queryRunner.query(`DROP TABLE "order_detail_products_product"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "order_detail"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
