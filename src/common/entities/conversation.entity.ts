import { CoreEntity } from '../../common/entities/core.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';
import { User } from '../../users/entities/user.entity';
import { Entity, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class Conversation extends CoreEntity {
  @OneToOne(type => Reservation)
  @JoinTable()
  reservation: Reservation;

  @ManyToMany(
    type => User,
    user => user.conversations,
  )
  @JoinTable()
  participants: User[];

  @OneToMany(
    type => Message,
    message => message.conversation,
  )
  messages: Message[];
}
