import { IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserRoleDto {
  @ApiProperty()
  @IsPositive({
    always: true,
    message: 'The field $property must be a positive number.',
  })
  readonly userId: number;

  @ApiProperty()
  @IsPositive({
    always: true,
    message: 'The field $property must be a positive number.',
  })
  readonly roleId: number;
}
