import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialTables1725474759072 implements MigrationInterface {
    name = 'InitialTables1725474759072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "channels" text NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notification" ("id" uuid NOT NULL, "message" character varying NOT NULL, "type" character varying NOT NULL, "sent" boolean NOT NULL DEFAULT false, "retries" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" uuid, "userId" uuid, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("id" uuid NOT NULL, "text" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" uuid, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_suscribed_category" ("userId" uuid NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_c6927e3c857f8806d430f5c6eaa" PRIMARY KEY ("userId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_76daee925a750801759c95821c" ON "user_suscribed_category" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9eb0d7d88c2ce17480d16b85d2" ON "user_suscribed_category" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_12cd9d4d4fdf4809e346b540e81" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_1ced25315eb974b73391fb1c81b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_7eaf14b0211d5bfb62feb9c97b6" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_suscribed_category" ADD CONSTRAINT "FK_76daee925a750801759c95821c2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_suscribed_category" ADD CONSTRAINT "FK_9eb0d7d88c2ce17480d16b85d27" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_suscribed_category" DROP CONSTRAINT "FK_9eb0d7d88c2ce17480d16b85d27"`);
        await queryRunner.query(`ALTER TABLE "user_suscribed_category" DROP CONSTRAINT "FK_76daee925a750801759c95821c2"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_7eaf14b0211d5bfb62feb9c97b6"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_1ced25315eb974b73391fb1c81b"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_12cd9d4d4fdf4809e346b540e81"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9eb0d7d88c2ce17480d16b85d2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_76daee925a750801759c95821c"`);
        await queryRunner.query(`DROP TABLE "user_suscribed_category"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
