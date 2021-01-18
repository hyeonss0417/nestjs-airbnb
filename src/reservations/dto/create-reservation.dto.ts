import { DateDiff, DateRange } from '../../common/datetime.utils';

export class CreateReservationDto {
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
