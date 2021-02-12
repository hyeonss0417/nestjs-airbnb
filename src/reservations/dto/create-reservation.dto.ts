import { DateDiff, DateRange } from '../../common/datetime.utils';

export class CreateReservationDto {
  roomId: number;
  guestId: number;
  guestCnt: number;
  checkIn: Date;
  checkOut: Date;
  price: number;
  paymentId: number;
}
