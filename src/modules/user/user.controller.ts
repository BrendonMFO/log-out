import { User } from './user.entity';
import { Crud } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';

@ApiTags('role')
@Controller('user')
@Crud({ model: { type: User } })
export class UserController {
  constructor(public service: UserService) {}

  @MessagePattern({ cmd: 'check' })
  async hasAuthorization(userId: number, roleId: number) {
    return await this.service.userHasAuthorization(userId, roleId);
  }
}
