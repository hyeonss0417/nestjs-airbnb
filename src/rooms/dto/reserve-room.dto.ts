import { DateDiff, DateRange } from 'src/common/datetime.utils';

export class ReserveRoomDTO {
  roomId: number;
  guestId: number;
  guestCnt: number;
  checkIn: Date;
  checkOut: Date;
  price: number;
  paymentId: number;
}
