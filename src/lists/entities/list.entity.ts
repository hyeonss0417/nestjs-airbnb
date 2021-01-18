import { IsString } from 'class-validator';
import { CoreEntity } from '../../common/entities/core.entity';
import { Room } from '../../rooms/entities/room.entity';
import { User } from '../../users/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class List extends CoreEntity {
  @Column()
  @IsString()
  name: string;

  @ManyToMany(
    type => Room,
    room => room.lists,
  )
  @JoinTable()
  rooms: Room[];

  @ManyToOne(
    type => User,
    user => user.saveLists,
  )
  owner: User;
}
