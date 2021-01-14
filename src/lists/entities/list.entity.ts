import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { User } from 'src/users/entities/user.entity';
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
