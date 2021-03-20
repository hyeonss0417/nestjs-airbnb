import { PickType } from '@nestjs/mapped-types';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto extends PickType(User, [
  'firstName',
  'lastName',
  'email',
  'password',
]) {
  @IsBoolean()
  isHost: boolean;

  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean;

  @IsString()
  @IsOptional()
  adminSecretKey?: string;
}
