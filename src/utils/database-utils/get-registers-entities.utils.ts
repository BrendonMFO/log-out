import { getMetadataArgsStorage } from 'typeorm';

export const getRegisterEntities = () => {
  return getMetadataArgsStorage().tables.map(tbl => tbl.target);
};
