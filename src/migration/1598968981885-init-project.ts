import {MigrationInterface, QueryRunner} from 'typeorm';

export class initProject1598968981885 implements MigrationInterface {
    name = 'initProject1598968981885'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "menus" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "openedAt" TIMESTAMP NOT NULL, "closedAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_3fec3d93327f4538e0cbd4349c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "value" integer NOT NULL, "description" character varying NOT NULL, CONSTRAINT "CHK_1d0cedf97797f47917a30df09c" CHECK (value > 0), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products_menu_menus" ("productsId" uuid NOT NULL, "menusId" uuid NOT NULL, CONSTRAINT "PK_2854739062ed42c45ff2300da8e" PRIMARY KEY ("productsId", "menusId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2cf29f1c8cb484705364cbdb55" ON "products_menu_menus" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_eea9706a65756cc81e1da847f9" ON "products_menu_menus" ("menusId") `);
        await queryRunner.query(`ALTER TABLE "products_menu_menus" ADD CONSTRAINT "FK_2cf29f1c8cb484705364cbdb558" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_menu_menus" ADD CONSTRAINT "FK_eea9706a65756cc81e1da847f95" FOREIGN KEY ("menusId") REFERENCES "menus"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_menu_menus" DROP CONSTRAINT "FK_eea9706a65756cc81e1da847f95"`);
        await queryRunner.query(`ALTER TABLE "products_menu_menus" DROP CONSTRAINT "FK_2cf29f1c8cb484705364cbdb558"`);
        await queryRunner.query(`DROP INDEX "IDX_eea9706a65756cc81e1da847f9"`);
        await queryRunner.query(`DROP INDEX "IDX_2cf29f1c8cb484705364cbdb55"`);
        await queryRunner.query(`DROP TABLE "products_menu_menus"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "menus"`);
    }

}
