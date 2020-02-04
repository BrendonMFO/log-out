import { User } from '../user/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { IsNotEmpty, IsOptional, IsString, IsInt, IsIn } from 'class-validator';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  @IsNotEmpty({ groups: [CrudValidationGroups.UPDATE] })
  id: number;

  @ApiProperty()
  @IsString({ always: true })
  @Column({ type: 'text', nullable: false })
  @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  description: string;

  @ApiProperty()
  @IsInt({ always: true })
  @IsOptional({ always: true })
  @IsIn([0, 1], { always: true })
  @Column({ type: 'tinyint', nullable: false, default: 1 })
  active: boolean;

  @ManyToMany(
    () => User,
    user => user.roles,
  )
  users: User[];
}
