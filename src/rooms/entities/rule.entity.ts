import { IsString } from 'class-validator';
import { CoreEntity } from '../../common/entities/core.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { Room } from './room.entity';

@Entity()
export class Rule extends CoreEntity {
  @Column()
  @IsString()
  name: string;

  @Column({ type: 'text', nullable: true })
  @IsString()
  description: string;

  @ManyToMany(
    type => Room,
    room => room.rules,
  )
  rooms: Room[];
}
