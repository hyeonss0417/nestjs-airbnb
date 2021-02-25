import { IsDate, IsEnum, IsInt, IsNumber } from 'class-validator';
import { DateDiff, DateRange } from '../../common/utils/datetime.utils';
import { CoreEntity } from '../../common/entities/core.entity';
import { dateTransformer } from '../../common/middlewares/class-validator';
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
    room => room.reservations,
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

  @Column({
    transformer: dateTransformer,
  })
  @IsDate()
  checkIn: Date;

  @Column({
    transformer: dateTransformer,
  })
  @IsDate()
  checkOut: Date;

  @Column({ type: 'int' })
  @IsNumber()
  price: number;

  getDurationInDyas(): number {
    return DateDiff.inDays(this.checkIn, this.checkOut);
  }

  getStayTerm(): DateRange {
    const d = new Date(this.checkOut);
    // To get the last night, subtract a day from checkOut date.
    d.setDate(this.checkOut.getDate() - 1);
    return new DateRange(this.checkIn, d);
  }

  isScheduled(): boolean {
    return (
      this.status === ReservationStatus.REQUESTED ||
      this.status === ReservationStatus.ACCEPTED
    );
  }
}
