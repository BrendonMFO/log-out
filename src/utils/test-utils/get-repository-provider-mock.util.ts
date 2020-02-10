import { getRepositoryToken } from '@nestjs/typeorm';

export const repositoryQueryBuilderMock = {
  add: jest.fn(),
  remove: jest.fn(),
  getCount: jest.fn(),
  of: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  relation: jest.fn().mockReturnThis(),
  andWhere: jest.fn().mockReturnThis(),
  innerJoin: jest.fn().mockReturnThis(),
};

export const getRepositoryProviderMock = (type: Function) => ({
  provide: getRepositoryToken(type),
  useValue: {
    createQueryBuilder: jest.fn(() => ({
      of: repositoryQueryBuilderMock.of,
      add: repositoryQueryBuilderMock.add,
      where: repositoryQueryBuilderMock.where,
      remove: repositoryQueryBuilderMock.remove,
      relation: repositoryQueryBuilderMock.relation,
      andWhere: repositoryQueryBuilderMock.andWhere,
      getCount: repositoryQueryBuilderMock.getCount,
      innerJoin: repositoryQueryBuilderMock.innerJoin,
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
