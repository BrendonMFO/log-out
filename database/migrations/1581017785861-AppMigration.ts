import {MigrationInterface, QueryRunner} from "typeorm";

export class AppMigration1581017785861 implements MigrationInterface {
    name = 'AppMigration1581017785861'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `login` varchar(100) NOT NULL, `active` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX `IDX_a62473490b3e4578fd683235c5` (`login`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `role` (`id` int NOT NULL AUTO_INCREMENT, `description` text NOT NULL, `active` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `user_roles_role` (`userId` int NOT NULL, `roleId` int NOT NULL, INDEX `IDX_5f9286e6c25594c6b88c108db7` (`userId`), INDEX `IDX_4be2f7adf862634f5f803d246b` (`roleId`), PRIMARY KEY (`userId`, `roleId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `user_roles_role` ADD CONSTRAINT `FK_5f9286e6c25594c6b88c108db77` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `user_roles_role` ADD CONSTRAINT `FK_4be2f7adf862634f5f803d246b8` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user_roles_role` DROP FOREIGN KEY `FK_4be2f7adf862634f5f803d246b8`", undefined);
        await queryRunner.query("ALTER TABLE `user_roles_role` DROP FOREIGN KEY `FK_5f9286e6c25594c6b88c108db77`", undefined);
        await queryRunner.query("DROP INDEX `IDX_4be2f7adf862634f5f803d246b` ON `user_roles_role`", undefined);
        await queryRunner.query("DROP INDEX `IDX_5f9286e6c25594c6b88c108db7` ON `user_roles_role`", undefined);
        await queryRunner.query("DROP TABLE `user_roles_role`", undefined);
        await queryRunner.query("DROP TABLE `role`", undefined);
        await queryRunner.query("DROP INDEX `IDX_a62473490b3e4578fd683235c5` ON `user`", undefined);
        await queryRunner.query("DROP TABLE `user`", undefined);
    }

}
