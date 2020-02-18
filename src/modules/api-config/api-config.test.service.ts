import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getRegisterEntities } from '../../utils/database-utils/get-registers-entities.utils';

@Injectable()
export class ApiConfigTestService {
  get apiConfig() {
    return {
      port: 3000,
      environment: 'test',
    };
  }

  get databaseConfig(): TypeOrmModuleOptions {
    return {
      port: 3306,
      type: 'mysql',
      logging: false,
      username: 'root',
      dropSchema: true,
      synchronize: true,
      host: 'mysql_test',
      password: 'aaa123',
      database: 'mysql_test',
      entities: getRegisterEntities(),
    };
  }
}
