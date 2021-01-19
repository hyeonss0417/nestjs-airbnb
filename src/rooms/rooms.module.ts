import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Reservation } from '../reservations/entities/reservation.entity';
import { Facility } from './entities/facility.entity';
import { Rule } from './entities/rule.entity';
import { Amenity } from './entities/amenity.entity';
import { Photo } from '../photos/entities/photo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Room,
      Facility,
      Rule,
      Amenity,
      Photo,
      Reservation,
    ]),
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
