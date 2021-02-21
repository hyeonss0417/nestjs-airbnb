import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from './entities/role.entity';
import { DeepPartial } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  @Transactional()
  async create(@Body() createUserDto: CreateUserDto): Promise<boolean> {
    return await this.usersService.create(createUserDto);
  }

  @Roles(UserRole.Admin)
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Get(':id')
  async getOtherProfile(@Param('id') id: string): Promise<DeepPartial<User>> {
    const user = await this.usersService.findOne(+id);
    const {
      createdAt,
      updatedAt,
      lastLogin,
      verified,
      email,
      roles,
      ...result
    } = user;
    return result;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
