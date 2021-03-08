import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { IsEnum, IsInt, IsNumber, IsString } from 'class-validator';
import { DateRange } from '../../common/utils/datetime.utils';
import { CoreEntity } from '../../common/entities/core.entity';
import { Country } from '../../countries/entities/country.entity';
import { Discount } from '../../discounts/entities/discount.entity';
import { List } from '../../lists/entities/list.entity';
import { Photo } from '../../photos/entries/photo.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';
import { Review } from '../../reviews/entities/review.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AmenityItem } from './amenity.entity';
import { CustomRule, DetailChoice, RuleChoice } from './rule.entity';

export enum RoomType {
  Apartment = 'Apartment',
  House = 'House',
  SecondaryUnit = 'SecondaryUnit',
  UniqueSpace = 'UniqueSpace',
  BedAndBreakfast = 'BedAndBreakfast',
  BoutiqueHotel = 'BoutiqueHotel',
}

@Entity()
export class Room extends CoreEntity {
  @ManyToOne(
    type => User,
    user => user.rooms,
  )
  host: User;

  @Column({ type: 'enum', enum: RoomType })
  @IsEnum(RoomType)
  roomType: RoomType;

  @Column({ type: 'int' })
  @IsInt()
  price: number;

  @OneToMany(
    type => Discount,
    discount => discount.room,
  )
  discounts: Discount[];

  @Column({ type: 'int', nullable: true })
  @IsInt()
  cleaningFee: number;

  @Column({ type: 'int' })
  @IsInt()
  roomCnt: number;

  @Column({ type: 'int' })
  @IsInt()
  bedCnt: number;

  @Column({ type: 'float' })
  @IsNumber()
  bathCnt: number;

  @Column({ type: 'int' })
  @IsInt()
  maxGuestCnt: number;

  @Column()
  @IsString()
  title: string;

  @Column({ type: 'text' })
  @IsString()
  description: string;

  @OneToMany(
    type => Photo,
    photo => photo.room,
  )
  photos: Photo[];

  @ManyToOne(
    type => Country,
    country => country.rooms,
  )
  country: Country;

  // ===== Address =====
  @Column()
  @IsString()
  addressState: string;

  @Column()
  @IsString()
  addressCity: string;

  @Column()
  @IsString()
  addressStreet: string;

  @Column({ nullable: true })
  @IsString()
  addressEtc: string;

  @Column()
  @IsString()
  addressZipCode: string;
  // ====================

  // ===== Options =====
  @OneToMany(
    type => RuleChoice,
    rule => rule.room,
  )
  ruleChoices: RuleChoice[];

  @OneToMany(
    type => CustomRule,
    desc => desc.room,
  )
  customRules: CustomRule[];

  @OneToMany(
    type => DetailChoice,
    detail => detail.room,
  )
  detailChoices: DetailChoice[];

  @ManyToMany(
    type => AmenityItem,
    amenityItem => amenityItem.rooms,
  )
  @JoinTable()
  amenities: AmenityItem[];
  // ====================

  // Inverse Side Relation
  @OneToMany(
    type => Reservation,
    reservation => reservation.room,
  )
  reservations: Reservation[];

  @OneToMany(
    type => Review,
    review => review.room,
  )
  reviews: Review[];

  @ManyToMany(
    type => List,
    list => list.rooms,
  )
  lists: List[];

  // ===== Domain Methods =====
  validateReservation(reservation: Reservation): boolean {
    const currentTime = new Date();
    if (
      currentTime > reservation.checkIn ||
      currentTime > reservation.checkOut ||
      reservation.checkIn >= reservation.checkOut
    ) {
      throw new BadRequestException('잘못된 예약 날짜입니다.');
    }

    if (!this.isAccommodable(reservation.getStayTerm())) {
      throw new BadRequestException('예약 불가능한 일정입니다.');
    }

    const totalPrice = this.calculateTotalPrice(
      reservation.getDurationInDyas(),
      reservation.guestCnt,
    );
    if (totalPrice != reservation.price) {
      throw new BadRequestException(
        `가격이 변동되었습니다. (현재가: ${totalPrice})`,
      );
    }

    return true;
  }

  calculateTotalPrice(stayDays: number, guestCnt: number): number {
    return this.calculatePriceInDetail(stayDays, guestCnt).totalPrice;
  }

  calculatePriceInDetail(stayDays: number, guestCnt: number): IPriceDetail {
    const accommodationFee = this.price * stayDays;
    const discountFee = this.calculateDiscountFee(accommodationFee, stayDays);
    const cleaningFee = this.cleaningFee || 0;

    const serviceFee = this.calculateServiceFee(
      accommodationFee - discountFee + cleaningFee,
    );
    const taxFee = this.calculateTaxFee(serviceFee, stayDays, guestCnt);

    const totalPrice =
      accommodationFee - discountFee + cleaningFee + serviceFee + taxFee;
    return {
      accommodationFee,
      discountFee,
      cleaningFee,
      serviceFee,
      taxFee,
      totalPrice,
    };
  }

  private isAccommodable(stayTerm: DateRange): boolean {
    if (!this.reservations)
      throw new InternalServerErrorException("Rservations does't exist.");
    return !this.reservations
      .filter(reservation => reservation.isScheduled())
      .map(reservation => reservation.getStayTerm())
      .some(otherStayRange => otherStayRange.intersect(stayTerm));
  }

  private calculateDiscountFee(price: number, stayDays: number): number {
    if (!this.discounts)
      throw new InternalServerErrorException("Discounts does't exist.");
    return this.discounts
      .map(discount => discount.calculateDiscountFee(price, stayDays))
      .reduce((acc, cur) => Math.max(acc, cur), 0);
  }

  private calculateServiceFee(price: number): number {
    // TODO: Make Billing System
    const commissionPercent = 15;
    return price * (commissionPercent * 0.01);
  }

  private calculateTaxFee(
    price: number,
    stayDays: number,
    guestCnt: number,
  ): number {
    if (!this.country)
      throw new InternalServerErrorException("Country does't exist.");
    return this.country.calculateTax(this, price, stayDays, guestCnt);
  }
}

interface IPriceDetail {
  accommodationFee: number;
  discountFee: number;
  cleaningFee: number;
  serviceFee: number;
  taxFee: number;
  totalPrice: number;
}
