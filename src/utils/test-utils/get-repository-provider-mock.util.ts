import { getRepositoryToken } from '@nestjs/typeorm';

export const repositoryQueryBuilderMock = {
  add: jest.fn(),
  remove: jest.fn(),
  of: jest.fn().mockReturnThis(),
  relation: jest.fn().mockReturnThis(),
};

export const getRepositoryProviderMock = (type: Function) => ({
  provide: getRepositoryToken(type),
  useValue: {
    createQueryBuilder: jest.fn(() => ({
      of: repositoryQueryBuilderMock.of,
      add: repositoryQueryBuilderMock.add,
      remove: repositoryQueryBuilderMock.remove,
      relation: repositoryQueryBuilderMock.relation,
    })),
    metadata: {
      columns: [],
      relations: [],
      connection: {
        options: {},
      },
    },
  },
});
