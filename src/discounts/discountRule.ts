import { DiscountType } from './entities/discount.entity';

export interface DiscountRule {
  isSatisfied: (stayDays: number) => boolean;
}

export const discountRule: Record<DiscountType, DiscountRule> = {
  Week: { isSatisfied: stayDays => (stayDays >= 7 ? true : false) },
  Month: { isSatisfied: stayDays => (stayDays >= 28 ? true : false) },
  Special: { isSatisfied: _ => true },
};
