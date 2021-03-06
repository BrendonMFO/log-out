import {
  getRepositoryProviderMock,
  repositoryQueryBuilderMock,
} from '../../utils/test-utils/get-repository-provider-mock.util';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, getRepositoryProviderMock(User)],
    }).compile();
    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should be authorized', async () => {
    jest.spyOn(repositoryQueryBuilderMock, 'getCount').mockReturnValue(1);
    const authorized = await service.userHasAuthorization(1, 1);
    expect(authorized).toBe(true);
  });

  it('should be unauthorized', async () => {
    jest.spyOn(repositoryQueryBuilderMock, 'getCount').mockReturnValue(0);
    const authorized = await service.userHasAuthorization(1, 1);
    expect(authorized).toBe(false);
  });

  it('should be insert a role correctly', () => {
    const userId = 1;
    const roleId = 2;
    service.addRole(userId, roleId);
    expect(repository.createQueryBuilder).toBeCalled();
    expect(repositoryQueryBuilderMock.relation).toBeCalledWith(User, 'roles');
    expect(repositoryQueryBuilderMock.of).toBeCalledWith(userId);
    expect(repositoryQueryBuilderMock.add).toBeCalledWith(roleId);
  });

  it('should be remove a role correctly', () => {
    const userId = 1;
    const roleId = 2;
    service.removeRole(userId, roleId);
    expect(repository.createQueryBuilder).toBeCalled();
    expect(repositoryQueryBuilderMock.relation).toBeCalledWith(User, 'roles');
    expect(repositoryQueryBuilderMock.of).toBeCalledWith(userId);
    expect(repositoryQueryBuilderMock.remove).toBeCalledWith(roleId);
  });
});
