import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './role/role.module';
import { ApiConfigModule } from './api-config/api-config.module';
import { ApiConfigService } from './api-config/api-config.service';

@Module({
  imports: [
    UserModule,
    RoleModule,
    ApiConfigModule,
    TypeOrmModule.forRootAsync({
      inject: [ApiConfigService],
      imports: [ApiConfigModule],
      useFactory: ({ databaseConfig }: ApiConfigService) => databaseConfig,
    }),
  ],
})
export class AppModule {}
