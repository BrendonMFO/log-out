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
  });

  it('should be authorized', async () => {
    const mock = jest
      .spyOn(userService, 'userHasAuthorization')
      .mockImplementation(() => new Promise(resolve => resolve(true)));

    const hasAuthorization = await controller.hasAuthorization(1, 1);

    expect(hasAuthorization).toBe(true);

    mock.mockReset();
  });
});
