import { User } from './user.entity';
import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryProviderMock } from '../../utils/test-utils/get-repository-provider-mock.util';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, getRepositoryProviderMock(User)],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be authorized', async () => {
    Object.defineProperty(service, 'findOne', {
      get: () => () => new Promise(resolve => resolve(new User())),
    });

    const authorized = await service.userHasAuthorization(1, 1);

    expect(authorized).toBe(true);
  });

  it('should be unauthorized', async () => {
    Object.defineProperty(service, 'findOne', {
      get: () => () => new Promise(resolve => resolve(null)),
    });

    const authorized = await service.userHasAuthorization(1, 1);

    expect(authorized).toBe(false);
  });
});
