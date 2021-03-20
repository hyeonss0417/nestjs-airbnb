import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { CoreEntity } from '../../common/entities/core.entity';

@Entity()
export class Verification extends CoreEntity {
  @Column({ unique: true })
  code: string;

  @OneToOne(type => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
