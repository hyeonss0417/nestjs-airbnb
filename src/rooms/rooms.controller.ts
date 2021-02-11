import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
  Request,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ReserveRoomDTO } from './dto/reserve-room.dto';
import { Reservation } from '../reservations/entities/reservation.entity';
import { Room } from './entities/room.entity';
import { User } from '../users/entities/user.entity';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @Transactional()
  async create(
    @Request() req,
    @Body() createRoomDto: CreateRoomDto,
  ): Promise<any> {
    return await this.roomsService.create(createRoomDto, req.user as User);
  }

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(+id);
  }

  @Post(':id')
  async reserve(
    @Param('id') roomId: number,
    @Req() { user },
    @Body() reserveRoomDTO: ReserveRoomDTO,
  ): Promise<Reservation> {
    return this.roomsService.reserve(roomId, reserveRoomDTO, user);
  }
}
