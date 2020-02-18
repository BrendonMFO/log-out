import { User } from './user.entity';
import { Crud } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserRoleDto } from './dtos/user-role.dto';
import { GrpcMethod } from '@nestjs/microservices';
import { Controller, Post, Body } from '@nestjs/common';

@ApiTags('user')
@Controller('user')
@Crud({ model: { type: User } })
export class UserController {
  constructor(public service: UserService) {}

  @Post('add-role')
  @GrpcMethod('UserService', 'AddRole')
  async addRole(@Body() { userId, roleId }: UserRoleDto) {
    await this.service.addRole(userId, roleId);
    return { message: 'Successful' };
  }

  @Post('remove-role')
  @GrpcMethod('UserService', 'RemoveRole')
  async removeRole(@Body() { userId, roleId }: UserRoleDto) {
    await this.service.removeRole(userId, roleId);
    return { message: 'Successful' };
  }

  @Post('has-authorization')
  @GrpcMethod('UserService', 'HasAuthorization')
  async hasAuthorization(@Body() { userId, roleId }: UserRoleDto) {
    return await this.service.userHasAuthorization(userId, roleId);
  }
}
