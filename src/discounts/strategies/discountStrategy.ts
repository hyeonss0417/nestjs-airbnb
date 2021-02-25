import { DiscountType } from '../entities/discount.entity';

export interface DiscountStrategy {
  isSatisfied: (stayDays: number) => boolean;
}

export const discountStrategies: Record<DiscountType, DiscountStrategy> = {
  Week: { isSatisfied: stayDays => (stayDays >= 7 ? true : false) },
  Month: { isSatisfied: stayDays => (stayDays >= 28 ? true : false) },
  Special: { isSatisfied: _ => true },
};
