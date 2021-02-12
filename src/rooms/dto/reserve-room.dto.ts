import { IsDate, IsNumber } from 'class-validator';

export class ReserveRoomDTO {
  @IsNumber()
  roomId: number;
  @IsNumber()
  guestCnt: number;
  @IsDate()
  checkIn: Date;
  @IsDate()
  checkOut: Date;
  @IsNumber()
  price: number;
  @IsNumber()
  paymentId: number;
}
