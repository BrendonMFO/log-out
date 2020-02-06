import { IsPositive } from 'class-validator';

export class UserRoleDto {
  @IsPositive({
    always: true,
    message: 'The field $property must be a positive number.',
  })
  readonly userId: number;

  @IsPositive({
    always: true,
    message: 'The field $property must be a positive number.',
  })
  readonly roleId: number;
}
