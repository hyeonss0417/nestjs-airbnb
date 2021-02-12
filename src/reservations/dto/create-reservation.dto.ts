import { IsNumber } from 'class-validator';
import { IsOnlyDate } from '../../common/class-validator';
export class CreateReservationDto {
  @IsNumber()
  roomId: number;
  @IsNumber()
  guestCnt: number;
  @IsOnlyDate()
  checkIn: string;
  @IsOnlyDate()
  checkOut: string;
  @IsNumber()
  price: number;
  @IsNumber()
  paymentId: number;
}
