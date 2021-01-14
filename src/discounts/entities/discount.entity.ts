import { CoreEntity } from 'src/common/entities/core.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Entity, ManyToMany } from 'typeorm';

@Entity()
export class Discount extends CoreEntity {
  @ManyToMany(
    type => Room,
    room => room.discounts,
  )
  rooms: Room[];
}
