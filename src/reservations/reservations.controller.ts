import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReserveRoomDTO } from '../rooms/dto/reserve-room.dto';
import { Reservation } from './entities/reservation.entity';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @Transactional()
  async reserve(
    @Req() { user },
    @Body() reserveRoomDTO: ReserveRoomDTO,
  ): Promise<Reservation> {
    return this.reservationsService.reserve(user, reserveRoomDTO);
  }

  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.cancel(+id);
  }
}
