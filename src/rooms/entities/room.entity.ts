import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { IsEnum, IsInt, IsNumber, IsString } from 'class-validator';
import { DateRange } from '../../common/datetime.utils';
import { CoreEntity } from '../../common/entities/core.entity';
import { Country } from '../../countries/entities/country.entity';
import { Discount } from '../../discounts/entities/discount.entity';
import { List } from '../../lists/entities/list.entity';
import { Photo } from '../../photos/entities/photo.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';
import { Review } from '../../reviews/entities/review.entity';
import { User } from '../../users/entities/user.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { ReserveRoomDTO } from '../dto/reserve-room.dto';
import { Amenity } from './amenity.entity';
import { Facility } from './facility.entity';
import { Rule } from './rule.entity';

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

  @Column()
  price: number;

  @OneToMany(
    type => Discount,
    discount => discount.rooms,
  )
  discounts: Discount[];

  @Column({ nullable: true })
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
  @ManyToMany(
    type => Facility,
    facility => facility.rooms,
  )
  facilities: Facility[];

  @ManyToMany(
    type => Rule,
    facility => facility.rooms,
  )
  rules: Rule[];

  @ManyToMany(
    type => Amenity,
    amenity => amenity.rooms,
  )
  amenities: Amenity[];
  // ====================

  // Inverse Side Relation
  @OneToMany(
    type => Reservation,
    reservation => reservation.room,
  )
  reservatons: Reservation[];

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
  reserve(reserveRoomDTO: ReserveRoomDTO, guest: User): Reservation {
    const reservation = new Reservation({
      ...reserveRoomDTO,
      room: this,
      guest,
    });
    this.validateReservation(reservation);
    return reservation;
  }

  private validateReservation(reservation: Reservation): boolean {
    if (!this.isAccommodable(reservation.getStayTerm())) {
      throw new BadRequestException('예약 불가능한 일정입니다.');
    }

    const totalPrice = this.calculateTotalPrice(
      reservation.getDurationInDyas(),
      reservation.guestCnt,
    );
    if (totalPrice != reservation.price) {
      throw new BadRequestException('가격이 변동되었습니다.');
    }

    return true;
  }

  private isAccommodable(stayTerm: DateRange): boolean {
    if (!this.reservatons) throw new InternalServerErrorException();
    return !this.reservatons
      .filter(reservation => reservation.isScheduled())
      .map(reservation => reservation.getStayTerm())
      .some(otherStayRange => otherStayRange.intersect(stayTerm));
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

  private calculateDiscountFee(price: number, stayDays: number): number {
    if (!this.discounts) throw new InternalServerErrorException();
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
    if (!this.country) throw new InternalServerErrorException();
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
