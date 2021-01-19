import { IsString } from 'class-validator';
import { CoreEntity } from '../../common/entities/core.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { Room } from './room.entity';
@Entity()
export class Facility extends CoreEntity {
  @Column({ unique: true })
  @IsString()
  name: string;

  @Column({ type: 'text', nullable: true })
  @IsString()
  description: string;

  @ManyToMany(
    type => Room,
    room => room.facilities,
  )
  rooms: Room[];
}
