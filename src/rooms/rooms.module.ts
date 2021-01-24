import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Reservation } from '../reservations/entities/reservation.entity';
import { CustomRule, DetailChoice, RuleChoice } from './entities/rule.entity';
import { AmenityItem, AmenityGroup } from './entities/amenity.entity';
import { Photo } from '../photos/entities/photo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Room,
      RuleChoice,
      CustomRule,
      DetailChoice,
      AmenityItem,
      AmenityGroup,
      Photo,
      Reservation,
    ]),
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
