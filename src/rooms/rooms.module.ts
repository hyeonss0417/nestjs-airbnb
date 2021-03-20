import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { CustomRule, DetailChoice, RuleChoice } from './entities/rule.entity';
import { AmenityItem, AmenityGroup } from './entities/amenity.entity';
import { PhotosModule } from '../photos/photos.module';
import { DiscountsModule } from '../discounts/discounts.module';

@Module({
  imports: [
    PhotosModule,
    DiscountsModule,
    TypeOrmModule.forFeature([
      Room,
      RuleChoice,
      CustomRule,
      DetailChoice,
      AmenityItem,
      AmenityGroup,
    ]),
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
