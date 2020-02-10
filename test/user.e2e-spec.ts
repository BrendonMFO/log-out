import * as request from 'supertest';
import { DeepPartial, Connection } from 'typeorm';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/modules/app.module';
import { User } from '../src/modules/user/user.entity';
import { Role } from '../src/modules/role/role.entity';
import { UserRoleDto } from '../src/modules/user/dtos/user-role.dto';
import { ApiConfigService } from '../src/modules/api-config/api-config.service';
import { ApiConfigTestService } from '../src/modules/api-config/api-config.test.service';

describe('User (e2e)', () => {
  let app: INestApplication;
  let databaseConnection: Connection;

  beforeEach(async () => {
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

  afterEach(async () => {
    await app.close();
  });

  it('should create a user', () => {
    const userDto: DeepPartial<User> = {
      name: 'New User 1',
      login: 'newUser1',
    };

    return request(app.getHttpServer())
      .post('/user')
      .send(userDto)
      .expect(201)
      .expect((res: { body: DeepPartial<User> }) => {
        expect(res.body).toMatchObject({
          id: 1,
          name: userDto.name,
          login: userDto.login,
          active: true,
        });
      });
  });

  it('should apply a new role to user', async () => {
    await Promise.all([
      databaseConnection
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([{ name: 'New User 1', login: 'newUser1' }])
        .execute(),
      databaseConnection
        .createQueryBuilder()
        .insert()
        .into(Role)
        .values([{ description: 'new Role' }])
        .execute(),
    ]);

    const dto: UserRoleDto = {
      userId: 1,
      roleId: 1,
    };

    return request(app.getHttpServer())
      .post('/user/add-role')
      .send(dto)
      .expect(201)
      .expect(res => {
        expect(res.body).toMatchObject({
          message: 'Successful',
        });
      });
  });
});
