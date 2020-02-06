import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { getRegisterEntities } from '../../utils/database-utils/get-registers-entities.utils';

@Injectable()
export class ApiConfigService {
  constructor(private readonly configService: ConfigService) {}

  get apiConfig() {
    return {
      port: Number(this.configService.get('PORT')),
      environment: this.configService.get('NODE_ENV'),
    };
  }

  get redisConfig() {
    return {
      transport: Transport.REDIS,
      options: {
        url: this.configService.get('REDIS_URL'),
      },
    };
  }

  get databaseConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      synchronize: true,
      entities: getRegisterEntities(),
      host: this.configService.get('TYPEORM_HOST'),
      database: this.configService.get('TYPEORM_DATABASE'),
      port: Number(this.configService.get('TYPEORM_PORT')),
      username: this.configService.get('TYPEORM_USERNAME'),
      password: this.configService.get('TYPEORM_PASSWORD'),
      migrations: [this.configService.get('TYPEORM_MIGRATIONS')],
      logging: Boolean(this.configService.get('TYPEORM_LOGGING')),
      migrationsRun: Boolean(this.configService.get('TYPEORM_MIGRATIONS_RUN')),
    };
  }
}
