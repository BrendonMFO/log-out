import { Crud } from '@nestjsx/crud';
import { Role } from './role.entity';
import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { RoleService } from './role.service';

@ApiTags('role')
@Controller('role')
@Crud({ model: { type: Role } })
export class RoleController {
  constructor(public service: RoleService) {}
}
