import { Column, Entity, ManyToOne } from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';
import { IsEnum } from 'class-validator';
import { User } from './user.entity';

export enum UserRole {
  Guest = 'guest',
  Host = 'host',
  Admin = 'admin',
}

@Entity()
export class Role extends CoreEntity {
  @ManyToOne(
    type => User,
    user => user.roles,
  )
  user: User;

  @Column({ type: 'enum', enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;
}
