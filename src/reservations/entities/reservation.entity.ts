import { IsDate, IsEnum, IsInt, IsNumber } from 'class-validator';
import { DateDiff, DateRange } from '../../common/datetime.utils';
import { CoreEntity } from '../../common/entities/core.entity';
import { Room } from '../../rooms/entities/room.entity';
import { User } from '../../users/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

export enum ReservationStatus {
  REQUESTED = 'REQUESTED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  FAEILED = 'FAEILED',
  CHECKEDIN = 'CHECKEDIN',
  CHECKEDOUT = 'CHECKEDOUT',
  CANCELED = 'CANCELED',
}

@Entity()
export class Reservation extends CoreEntity {
  @ManyToOne(
    type => Room,
    room => room.reservatons,
  )
  room: Room;

  @ManyToMany(
    type => User,
    user => user.reservations,
  )
  @JoinTable()
  guests: User[];

  @Column({ type: 'int' })
  @IsInt()
  guestCnt: number;

  @Column({ type: 'enum', enum: ReservationStatus, nullable: true })
  @IsEnum(ReservationStatus)
  status: ReservationStatus;

  @Column({ type: 'date' })
  @IsDate()
  checkIn: Date;

  @Column({ type: 'date' })
  @IsDate()
  checkOut: Date;

  @Column({ type: 'int' })
  @IsNumber()
  price: number;

  getDurationInDyas(): number {
    return DateDiff.inDays(this.checkIn, this.checkOut);
  }

  getStayTerm(): DateRange {
    const lastNight = new Date();
    lastNight.setDate(this.checkOut.getDate() - 1);

    return new DateRange(this.checkIn, lastNight);
  }

  isScheduled(): boolean {
    return (
      this.status === ReservationStatus.REQUESTED ||
      this.status === ReservationStatus.ACCEPTED
    );
  }

  constructor(data?: IReservationConstructor) {
    super();
    if (data) {
      const { room, guest, guestCnt, checkIn, checkOut, price } = data;
      this.room = room;
      this.guests = [guest];
      this.guestCnt = guestCnt;
      this.checkIn = checkIn;
      this.checkOut = checkOut;
      this.price = price;
    }
  }
}

interface IReservationConstructor {
  room: Room;
  guest: User;
  guestCnt: number;
  checkIn: Date;
  checkOut: Date;
  price: number;
}
