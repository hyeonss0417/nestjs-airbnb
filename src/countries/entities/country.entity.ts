import { IsEnum } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { taxRules } from '../taxRule';

export enum CountryName {
  SouthKorea = 'SouthKorea',
  Japan = 'Japan',
  Bermuda = 'Bermuda',
  Brazil = 'Brazil',
  BritishVirginIslands = 'BritishVirginIslands',
  Canada = 'Canada',
  France = 'France',
  Germany = 'Germany',
  India = 'India',
  Italy = 'Italy',
  Lithuania = 'Lithuania',
  Mexico = 'Mexico',
  Netherlands = 'Netherlands',
  Portugal = 'Portugal',
  Switzerland = 'Switzerland',
}

@Entity()
export class Country extends CoreEntity {
  @Column({ type: 'enum', enum: CountryName })
  @IsEnum(CountryName)
  name: CountryName;

  @OneToMany(
    type => Room,
    room => room.addressCountry,
  )
  rooms: Room[];

  calculateTax(room: Room, price: number, guestCnt: number, stayDays: number) {
    const tax = taxRules[this.name].calculateTax(room, stayDays);

    let result = price * tax.percent;
    result += tax.amount * guestCnt * stayDays;
    return result;
  }
}
