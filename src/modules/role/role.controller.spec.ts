import { Role } from './role.entity';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryProviderMock } from '../../utils/test-utils/get-repository-provider-mock.util';

describe('Role Controller', () => {
  let controller: RoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [RoleService, getRepositoryProviderMock(Role)],
    }).compile();

    controller = module.get<RoleController>(RoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
