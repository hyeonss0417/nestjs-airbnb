import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { CreateReservationDto } from './create-reservation.dto';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {
  @IsNumber()
  id: number;
}
