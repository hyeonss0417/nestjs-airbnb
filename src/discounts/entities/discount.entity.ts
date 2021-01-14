import { IsDate, IsEnum, IsInt, IsNumber } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { discountRule } from '../discountRule';

export enum DiscountType {
  Week = 'Week',
  Month = 'Month',
  Special = 'Special',
}

@Entity()
export class Discount extends CoreEntity {
  @Column({ type: 'enum', enum: DiscountType })
  @IsEnum(DiscountType)
  type: DiscountType;

  @ManyToOne(
    type => Room,
    room => room.discounts,
  )
  rooms: Room;

  @Column({ type: 'int', nullable: true })
  @IsInt()
  percent: number;

  @Column({ type: 'datetime', nullable: true })
  @IsDate()
  endDate: Date;

  calculateDiscountFee(price: number, stayDays: number): number {
    let result = 0;

    const now = new Date();
    if (
      this.endDate.getTime() !== null &&
      this.endDate.getTime() < now.getTime()
    ) {
      return result;
    }

    const isSatisfied = discountRule[this.type].isSatisfied(stayDays);
    if (isSatisfied) result += price * (this.percent * 0.01);

    return result;
  }
}
