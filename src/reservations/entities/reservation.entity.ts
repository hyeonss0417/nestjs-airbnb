import { CoreEntity } from 'src/common/entities/core.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum ReservationStatus {
  REQUESTED = 'REQUESTED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  FAEILED = 'FAEILED',
  CHECKEDIN = 'CHECKEDIN',
  CHECKEDOUT = 'CHECKEDOUT',
}

@Entity()
export class Reservation extends CoreEntity {
  @ManyToOne(
    type => Room,
    room => room.reservatons,
  )
  room: Room;

  @ManyToOne(
    type => User,
    user => user.reservations,
  )
  guest: User;
}
