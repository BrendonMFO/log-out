import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryProviderMock } from '../../utils/test-utils/get-repository-provider-mock.util';

describe('User Controller', () => {
  let userService: UserService;
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, getRepositoryProviderMock(User)],
      controllers: [UserController],
    }).compile();

    userService = module.get<UserService>(UserService);
    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should be authorized', async () => {
    const mock = jest
      .spyOn(userService, 'userHasAuthorization')
      .mockImplementation(() => new Promise(resolve => resolve(true)));

    const hasAuthorization = await controller.hasAuthorization({
      userId: 1,
      roleId: 1,
    });

    expect(hasAuthorization).toBe(true);

    mock.mockReset();
  });

  it('should be unauthorized', async () => {
    const mock = jest
      .spyOn(userService, 'userHasAuthorization')
      .mockImplementation(() => new Promise(resolve => resolve(false)));

    const hasAuthorization = await controller.hasAuthorization({
      userId: 1,
      roleId: 1,
    });

    expect(hasAuthorization).toBe(false);

    mock.mockReset();
  });

  it('should be insert a role correctly', async () => {
    const mock = jest
      .spyOn(userService, 'addRole')
      .mockImplementation(() => new Promise(resolve => resolve()));

    const result = await controller.addRole({ userId: 1, roleId: 2 });

    expect(result).toMatchObject({
      message: 'Successful',
    });

    mock.mockReset();
  });

  it('should be remove a role correctly', async () => {
    const mock = jest
      .spyOn(userService, 'removeRole')
      .mockImplementation(() => new Promise(resolve => resolve()));

    const result = await controller.removeRole({ userId: 1, roleId: 2 });

    expect(result).toMatchObject({
      message: 'Successful',
    });

    mock.mockReset();
  });
});
