import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) userRepository: Repository<User>) {
    super(userRepository);
  }

  async addRole(userId: number, roleId: number) {
    await this.queryUserRoles(userId).add(roleId);
  }

  async removeRole(userId: number, roleId: number) {
    await this.queryUserRoles(userId).remove(roleId);
  }

  async userHasAuthorization(userId: number, roleId: number) {
    const userRoleCount = await this.repo
      .createQueryBuilder('user')
      .innerJoin('user.roles', 'roles')
      .where('user.id = :userId', { userId })
      .andWhere('user.active = 1')
      .andWhere('roles.id = :roleId', { roleId })
      .andWhere('roles.active = 1')
      .getCount();
    return userRoleCount !== 0;
  }

  private queryUserRoles(userId: number) {
    return this.repo
      .createQueryBuilder()
      .relation(User, 'roles')
      .of(userId);
  }
}
