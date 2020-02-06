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
    const user = await this.findOne({
      relations: ['roles'],
      where: {
        id: userId,
        active: 1,
        roles: {
          id: roleId,
          active: 1,
        },
      },
    });
    return user != null;
  }

  private queryUserRoles(userId: number) {
    return this.repo
      .createQueryBuilder()
      .relation(User, 'roles')
      .of(userId);
  }
}
