import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from '../rooms/entities/room.entity';
import { Reservation } from './entities/reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Reservation])],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
