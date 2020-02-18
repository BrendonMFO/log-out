import { Connection } from 'typeorm';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/modules/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../src/modules/user/user.entity';
import { Role } from '../src/modules/role/role.entity';
import { Transport, ClientGrpc, ClientsModule } from '@nestjs/microservices';
import { UserGrpc } from '../src/modules/user/interfaces/user-grpc.interface';
import { ApiConfigService } from '../src/modules/api-config/api-config.service';
import { ApiConfigTestService } from '../src/modules/api-config/api-config.test.service';

describe('User (e2e)', () => {
  let userGrpc: UserGrpc;
  let app: INestApplication;
  let databaseConnection: Connection;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        ClientsModule.register([
          {
            name: 'USER_PACKAGE',
            transport: Transport.GRPC,
            options: {
              package: 'user',
              protoPath: './src/modules/user/user.proto',
            },
          },
        ]),
      ],
    })
      .overrideProvider(ApiConfigService)
      .useClass(ApiConfigTestService)
      .compile();

    app = moduleFixture.createNestApplication();

    app.connectMicroservice({
      transport: Transport.GRPC,
      options: {
        package: 'user',
        protoPath: './src/modules/user/user.proto',
      },
    });

    databaseConnection = app.get<Connection>(Connection);
    await app.startAllMicroservicesAsync();
    await app.init();
    userGrpc = app
      .get<ClientGrpc>('USER_PACKAGE')
      .getService<UserGrpc>('UserService');
  });

  beforeEach(async () => {
    await databaseConnection.synchronize(true);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
    expect(userGrpc).toBeDefined();
    expect(databaseConnection).toBeDefined();
  });

  it('should be unauthorized', done => {
    userGrpc.hasAuthorization({ roleId: 1, userId: 1 }).subscribe(response => {
      expect(response).toMatchObject({
        userId: 1,
        roleId: 1,
        authorized: false,
      });
      done();
    });
  });

  it('should be authorized', async done => {
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
    await databaseConnection
      .createQueryBuilder()
      .relation(User, 'roles')
      .of(1)
      .add(1);

    userGrpc.hasAuthorization({ roleId: 1, userId: 1 }).subscribe(response => {
      expect(response).toMatchObject({
        userId: 1,
        roleId: 1,
        authorized: true,
      });
      done();
    });
  });
});
