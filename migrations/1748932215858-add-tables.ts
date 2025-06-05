import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTables1748932215858 implements MigrationInterface {
    name = 'AddTables1748932215858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`no_relation_a\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`field_a\` int NOT NULL,
                \`field_a_transformer\` int NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`no_relation_b\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`field_b\` int NOT NULL,
                \`field_b_transformer\` int NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`relation_b\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`field_b\` int NOT NULL,
                \`field_b_transformer\` int NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`relation_a\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`field_a\` int NOT NULL,
                \`field_a_transformer\` int NOT NULL,
                \`relation_b_id\` int NOT NULL,
                UNIQUE INDEX \`REL_fad04ba1fc504c3f718c26fac5\` (\`relation_b_id\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`transformer_relation_b\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`field_b\` int NOT NULL,
                \`field_b_transformer\` int NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`transformer_relation_a\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`field_a\` int NOT NULL,
                \`field_a_transformer\` int NOT NULL,
                \`transformer_relation_b_id\` int NOT NULL,
                UNIQUE INDEX \`REL_5950f004cd0b2d62b1e2d2e0c2\` (\`transformer_relation_b_id\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`binary_relation_b\` (
                \`id\` binary(8) NOT NULL,
                \`field_b\` int NOT NULL,
                \`field_b_binary\` int NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`binary_relation_a\` (
                \`id\` binary(8) NOT NULL,
                \`field_a\` int NOT NULL,
                \`field_a_transformer\` int NOT NULL,
                \`binary_relation_b_id\` binary(8) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`relation_a\`
            ADD CONSTRAINT \`FK_fad04ba1fc504c3f718c26fac5a\` FOREIGN KEY (\`relation_b_id\`) REFERENCES \`relation_b\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`transformer_relation_a\`
            ADD CONSTRAINT \`FK_5950f004cd0b2d62b1e2d2e0c23\` FOREIGN KEY (\`transformer_relation_b_id\`) REFERENCES \`transformer_relation_b\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`binary_relation_a\`
            ADD CONSTRAINT \`FK_a_to_b\` FOREIGN KEY (\`binary_relation_b_id\`) REFERENCES \`binary_relation_b\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`binary_relation_a\` DROP FOREIGN KEY \`FK_a_to_b\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`transformer_relation_a\` DROP FOREIGN KEY \`FK_5950f004cd0b2d62b1e2d2e0c23\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`relation_a\` DROP FOREIGN KEY \`FK_fad04ba1fc504c3f718c26fac5a\`
        `);
        await queryRunner.query(`
            DROP TABLE \`binary_relation_a\`
        `);
        await queryRunner.query(`
            DROP TABLE \`binary_relation_b\`
        `);
        await queryRunner.query(`
            DROP INDEX \`REL_5950f004cd0b2d62b1e2d2e0c2\` ON \`transformer_relation_a\`
        `);
        await queryRunner.query(`
            DROP TABLE \`transformer_relation_a\`
        `);
        await queryRunner.query(`
            DROP TABLE \`transformer_relation_b\`
        `);
        await queryRunner.query(`
            DROP INDEX \`REL_fad04ba1fc504c3f718c26fac5\` ON \`relation_a\`
        `);
        await queryRunner.query(`
            DROP TABLE \`relation_a\`
        `);
        await queryRunner.query(`
            DROP TABLE \`relation_b\`
        `);
        await queryRunner.query(`
            DROP TABLE \`no_relation_b\`
        `);
        await queryRunner.query(`
            DROP TABLE \`no_relation_a\`
        `);
    }

}
