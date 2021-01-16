import { DateDiff, DateRange } from 'src/common/datetime.utils';

export class ReserveRoomDTO {
  guestCnt: number;
  checkIn: Date;
  checkOut: Date;
  price: number;
  paymentId: number;
}
