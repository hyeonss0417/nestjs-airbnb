import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, Column, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { v4 as uuidv4 } from 'uuid';

export class Verification extends CoreEntity {
  @Column()
  code: string;

  @OneToOne(type => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @BeforeInsert()
  createCode(): void {
    this.code = uuidv4();
  }
}
