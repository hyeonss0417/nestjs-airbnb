import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Request,
  HttpCode,
  Patch,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from './entities/role.entity';
import { DeepPartial } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { SignInUserDTO } from './dto/sign-in-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('sign-up')
  @Transactional()
  async createAccount(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.signUp(createUserDto);
  }

  @Public()
  @Post('sign-in')
  @HttpCode(200)
  async signIn(
    @Body() loginUesrDto: SignInUserDTO,
  ): Promise<{ accessToken: string }> {
    return { accessToken: await this.usersService.signIn(loginUesrDto) };
  }

  @Roles(UserRole.Admin)
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get('profile')
  getProfile(@Request() { user }: { user: User }) {
    return user;
  }

  @Public()
  @Get(':id')
  async getOtherProfile(@Param('id') id: string): Promise<DeepPartial<User>> {
    const user = await this.usersService.findOne(+id);
    const { lastLogin, verified, roles, ...result } = user;
    return result;
  }

  @Patch(':id')
  update(
    @Request() { user }: { user: User },
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<boolean> {
    if (user.id !== +id)
      throw new UnauthorizedException('자신의 프로필만 변결할 수 있습니다');
    return this.usersService.update(+id, updateUserDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
