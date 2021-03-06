import * as request from 'supertest';
import { DeepPartial, Connection } from 'typeorm';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/modules/app.module';
import { Role } from '../src/modules/role/role.entity';
import { ApiConfigService } from '../src/modules/api-config/api-config.service';
import { ApiConfigTestService } from '../src/modules/api-config/api-config.test.service';

describe('Role (e2e)', () => {
  let app: INestApplication;
  let databaseConnection: Connection;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ApiConfigService)
      .useClass(ApiConfigTestService)
      .compile();
    app = moduleFixture.createNestApplication();
    databaseConnection = app.get<Connection>(Connection);
    await app.init();
  });

  beforeEach(async () => {
    await databaseConnection.synchronize(true);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a role', () => {
    const roleDto: DeepPartial<Role> = {
      description: 'New Role 1',
    };

    return request(app.getHttpServer())
      .post('/role')
      .send(roleDto)
      .expect(201)
      .expect((res: { body: DeepPartial<Role> }) => {
        expect(res.body).toMatchObject({
          active: true,
          description: roleDto.description,
        });
      });
  });
});
