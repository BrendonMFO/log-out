import { getRepositoryToken } from '@nestjs/typeorm';

export const getRepositoryProviderMock = (type: Function) => ({
  provide: getRepositoryToken(type),
  useValue: {
    metadata: {
      columns: [],
      relations: [],
      connection: {
        options: {},
      },
    },
  },
});
