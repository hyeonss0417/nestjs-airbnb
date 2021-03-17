import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { Reservation } from './entities/reservation.entity';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/role.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { User } from '../users/entities/user.entity';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @Roles(UserRole.Guest)
  @Transactional()
  async reserve(
    @Req() { user }: { user: User },
    @Body() reserveRoomDTO: CreateReservationDto,
  ): Promise<Reservation> {
    return this.reservationsService.reserve(user, reserveRoomDTO);
  }

  @Get()
  @Roles(UserRole.Admin)
  async findAll() {
    return await this.reservationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.reservationsService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.reservationsService.cancel(+id);
  }
}
