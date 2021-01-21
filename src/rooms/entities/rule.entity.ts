import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { CoreEntity } from '../../common/entities/core.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from './room.entity';

// @Entity()
// export class Rule extends CoreEntity {
//   @Column()
//   @IsString()
//   name: string;

//   @Column({ type: 'text', nullable: true })
//   @IsString()
//   description: string;

//   @ManyToMany(
//     type => Room,
//     room => room.rules,
//   )
//   rooms: Room[];
// }

export class Rule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsBoolean()
  isExplainable: boolean;

  @ManyToMany(
    type => Room,
    room => room.rules,
  )
  rooms: Room[];

  @OneToMany(
    type => RuleDescription,
    desc => desc.rule,
  )
  descriptions: RuleDescription[];
}

export class RuleDescription {
  id: number;

  @Column()
  description: string;

  @ManyToOne(
    type => Rule,
    rule => rule.descriptions,
  )
  rule: Rule;

  @ManyToOne(
    type => Room,
    room => room.ruleDescriptions,
  )
  room: Room;
}

export class CustomRule {
  id: number;
  title: string;

  @ManyToOne(
    type => Room,
    room => room.customRules,
  )
  room: Room;
}

//===============================

export class Detail {
  id: number;
  title: string;

  @ManyToMany(
    type => Room,
    room => room.details,
  )
  rooms: Room[];

  @OneToMany(
    type => DetailDescription,
    desc => desc.detail,
  )
  descriptions: DetailDescription[];
}

export class DetailDescription {
  id: number;
  description: string;

  @ManyToOne(
    type => Detail,
    detail => detail.descriptions,
  )
  detail: Detail;
}
