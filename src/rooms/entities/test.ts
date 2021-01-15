import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { DateRange } from 'src/common/datetime.utils';

export class Room {
  calculateTotalPrice(stayDays: number, guestCnt: number): number {
    return this.calculatePriceInDetail(stayDays, guestCnt).totalPrice;
  }
  calculatePriceInDetail(stayDays: number, guestCnt: number): IPriceDetail {
    const accommodationFee = this.price * stayDays;
    const discountFee = this.calculateDiscountFee(accommodationFee, stayDays);
    const cleaningFee = this.cleaningFee || 0;

    const _priceBreforSeriveFee = accommodationFee - discountFee + cleaningFee;
    const serviceFee = this.calculateServiceFee(_priceBreforSeriveFee);

    const _priceBreforTaxFee = _priceBreforSeriveFee + serviceFee;
    const taxFee = this.calculateTaxFee(_priceBreforTaxFee, stayDays, guestCnt);

    const totalPrice = _priceBreforTaxFee + taxFee;
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
    const discountFee = this.discounts.reduce(
      (acc, discount) =>
        Math.max(acc, discount.calculateDiscountFee(price, stayDays)),
      0,
    );
    return discountFee;
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

export class Room_ {
  reserve(reserveRoomDTO: ReserveRoomDTO, guest: User): Reservation {
    return new Reservation({ ...reserveRoomDTO, room: this, guest });
  }
}

export class Room__ {
  private calculateDiscountFee(price: number, stayDays: number): number {
    if (!this.discounts) throw new InternalServerErrorException();
    const discountFee = this.discounts.reduce(
      (acc, discount) =>
        Math.max(acc, discount.calculateDiscountFee(price, stayDays)),
      0,
    );
    return discountFee;
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
