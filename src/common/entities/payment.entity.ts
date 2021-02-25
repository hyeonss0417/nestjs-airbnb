import { CoreEntity } from './core.entity';
import { User } from '../../users/entities/user.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity()
export class Payment extends CoreEntity {
  @ManyToOne(
    type => User,
    user => user.payments,
  )
  user: User;
}
