import { User } from './user.entity';
import { Crud } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserRoleDto } from './dtos/user-role.dto';
import { MessagePattern } from '@nestjs/microservices';
import { Controller, Post, Body } from '@nestjs/common';

@ApiTags('user')
@Controller('user')
@Crud({ model: { type: User } })
export class UserController {
  constructor(public service: UserService) {}

  @Post('add-role')
  @MessagePattern({ cmd: 'add-role' })
  async addRole(@Body() { userId, roleId }: UserRoleDto) {
    await this.service.addRole(userId, roleId);
    return { message: 'Successful' };
  }

  @Post('remove-role')
  @MessagePattern({ cmd: 'remove-role' })
  async removeRole(@Body() { userId, roleId }: UserRoleDto) {
    await this.service.removeRole(userId, roleId);
    return { message: 'Successful' };
  }

  @Post('has-authorization')
  @MessagePattern({ cmd: 'check' })
  async hasAuthorization(@Body() { userId, roleId }: UserRoleDto) {
    return await this.service.userHasAuthorization(userId, roleId);
  }
}
