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
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { User } from '../users/entities/user.entity';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { Room } from './entities/room.entity';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  //@Roles(UserRole.Host)
  @Transactional()
  async create(
    @Request() req,
    @Body() createRoomDto: CreateRoomDto,
  ): Promise<any> {
    return await this.roomsService.create(req.user as User, createRoomDto);
  }

  @Get()
  async findAll(): Promise<Room[]> {
    return await this.roomsService.findAll();
  }

  //@Roles(UserRole.Host)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.roomsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(+id);
  }
}
