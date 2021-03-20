import { IsBoolean, IsDate, IsEmail, IsString } from 'class-validator';
import { CoreEntity } from '../../common/entities/core.entity';
import { Payment } from '../../common/entities/payment.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';
import { Room } from '../../rooms/entities/room.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { Conversation } from '../../common/entities/conversation.entity';
import { Message } from '../../common/entities/message.entity';
import { List } from '../../lists/entities/list.entity';
import { Review } from '../../reviews/entities/review.entity';
import { Role } from './role.entity';

@Entity()
export class User extends CoreEntity {
  @Column()
  @IsString()
  firstName: string;

  @Column()
  @IsString()
  lastName: string;

  @Column({ unique: true })
  @IsEmail({}, { message: '올바른 이메일을 입력해주세요' })
  email: string;

  @Column({ select: false })
  @IsString()
  password: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @IsDate()
  lastLogin: Date;

  @Column({ default: false })
  @IsBoolean()
  verified: boolean;

  @Column({ length: 500, nullable: true })
  @IsString()
  bio: string;

  @Column({ nullable: true })
  @IsString()
  avatar: string;

  @OneToMany(
    type => Role,
    role => role.user,
    { eager: true },
  )
  roles: Role[];

  // ===== Inverse side Relation =====

  @OneToMany(
    type => List,
    list => list.owner,
  )
  saveLists: List[];

  @OneToMany(
    type => Room,
    room => room.host,
  )
  rooms: Room[];

  @ManyToMany(
    type => Reservation,
    reservation => reservation.guests,
  )
  reservations: Reservation[];

  @OneToMany(
    type => Review,
    review => review.guest,
  )
  reviews: Review[];

  @ManyToMany(
    type => Conversation,
    conversation => conversation.participants,
  )
  conversations: Conversation[];

  @OneToMany(
    type => Message,
    message => message.sender,
  )
  messages: Message[];

  @OneToMany(
    type => Payment,
    payment => payment.user,
  )
  payments: Payment[];

  // ===== Security =====
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        const saltOrRounds = 10;
        this.password = await bcrypt.hash(this.password, saltOrRounds);
      } catch (e) {
        console.log(e);
        throw new InternalServerErrorException();
      }
    }
  }

  // ===== Methods =====
  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
