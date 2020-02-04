import { CrudValidationGroups } from '@nestjsx/crud';
import {
  Entity,
  Column,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  IsIn,
  IsInt,
  IsString,
  MaxLength,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from '../role/role.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @IsNotEmpty({ groups: [CrudValidationGroups.UPDATE] })
  id: number;

  @ApiProperty()
  @IsString({ always: true })
  @MaxLength(255, { always: true })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @Column({ type: 'string', length: 255, nullable: false })
  name: string;

  @ApiProperty()
  @IsString({ always: true })
  @MaxLength(100, { always: true })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @Column({ type: 'string', length: 100, nullable: false })
  login: string;

  @ApiProperty()
  @IsInt({ always: true })
  @IsOptional({ always: true })
  @IsIn([0, 1], { always: true })
  @Column({ type: 'tinyint', nullable: false, default: 1 })
  active: boolean;

  @JoinTable()
  @Type(() => Role)
  @IsOptional({ always: true })
  @ManyToMany(
    () => Role,
    role => role.users,
  )
  roles: Role[];
}
