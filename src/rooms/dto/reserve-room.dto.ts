import { check } from 'prettier';
import { DateDiff, DateRange } from 'src/common/datetime.utils';

export class ReserveRoomDTO {
  roomId: number;
  guestId: number;
  guestCnt: number;
  checkIn: Date;
  checkOut: Date;
  price: number;
  paymentId: number;

  getDurationInDyas(): number {
    return DateDiff.inDays(this.checkIn, this.checkOut);
  }

  getDateRange(): DateRange {
    return new DateRange(this.checkIn, this.checkOut);
  }
}
