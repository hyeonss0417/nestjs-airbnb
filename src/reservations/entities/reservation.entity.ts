import { IsDate, IsEnum } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { User } from 'src/users/entities/user.entity';
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

  @Column({ type: 'enum', enum: ReservationStatus })
  @IsEnum(ReservationStatus)
  status: ReservationStatus;

  @Column({ type: 'date' })
  @IsDate()
  checkIn: Date;

  @Column({ type: 'date' })
  @IsDate()
  checkOut: Date;
}
