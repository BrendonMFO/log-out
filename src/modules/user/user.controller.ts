import { User } from './user.entity';
import { Crud } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { Controller, Post, Body } from '@nestjs/common';
import { UserAddRoleDto } from './dtos/user-add-role.dto';

@ApiTags('user')
@Controller('user')
@Crud({ model: { type: User } })
export class UserController {
  constructor(public userService: UserService) {}

  @Post('add-role')
  @MessagePattern({ cmd: 'add-role' })
  async addRole(@Body() { userId, roleId }: UserAddRoleDto) {
    await this.userService.addRole(userId, roleId);
    return { message: 'Successful' };
  }

  @MessagePattern({ cmd: 'check' })
  async hasAuthorization(userId: number, roleId: number) {
    return await this.userService.userHasAuthorization(userId, roleId);
  }
}
