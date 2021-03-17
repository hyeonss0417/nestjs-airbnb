import { PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class SignInUserDTO extends PickType(User, ['email', 'password']) {}
