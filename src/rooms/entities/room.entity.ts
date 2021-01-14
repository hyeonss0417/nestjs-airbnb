import { CoreEntity } from 'src/common/entities/core.entity';
import { List } from 'src/lists/entities/list.entity';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Room extends CoreEntity {
  @ManyToOne(
    type => User,
    user => user.rooms,
  )
  host: User;

  @OneToMany(
    type => Reservation,
    reservation => reservation.room,
  )
  reservatons: Reservation[];

  @OneToMany(
    type => Review,
    review => review.room,
  )
  reviews: Review[];

  @ManyToMany(
    type => List,
    list => list.rooms,
  )
  lists: List[];
}
