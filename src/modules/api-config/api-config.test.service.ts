import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { getRegisterEntities } from '../../utils/database-utils/get-registers-entities.utils';

@Injectable()
export class ApiConfigTestService {
  get apiConfig() {
    return {
      port: 3000,
      environment: 'test',
    };
  }

  get redisConfig() {
    return {
      transport: Transport.REDIS,
      options: {
        url: 'testUrl',
      },
    };
  }

  get databaseConfig(): TypeOrmModuleOptions {
    return {
      port: 3306,
      type: 'mysql',
      host: 'test',
      logging: false,
      database: 'test',
      username: 'root',
      dropSchema: true,
      synchronize: true,
      password: 'aaa123',
      entities: getRegisterEntities(),
    };
  }
}
