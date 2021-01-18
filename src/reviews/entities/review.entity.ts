import { CoreEntity } from '../../common/entities/core.entity';
import { Room } from '../../rooms/entities/room.entity';
import { User } from '../../users/entities/user.entity';
import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { Rating } from './rating.entity';

@Entity()
export class Review extends CoreEntity {
  @ManyToOne(
    type => User,
    user => user.reviews,
  )
  guest: User;

  @ManyToOne(
    type => Room,
    room => room.reviews,
  )
  room: Room;

  // Inverse side Relation
  @OneToMany(
    type => Rating,
    rating => rating.review,
  )
  ratings: Rating[];
}
