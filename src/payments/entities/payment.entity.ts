import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity()
export class Payment extends CoreEntity {
  @ManyToOne(
    type => User,
    user => user.payments,
  )
  user: User;
}
