import { IsDate, IsEnum, IsInt, IsNumber, IsOptional } from 'class-validator';
import { DiscountType } from '../entities/discount.entity';

export class CreateDiscountDTO {
  @IsEnum(DiscountType)
  type: DiscountType;

  @IsInt()
  percent: number;

  room: { id: number };

  @IsOptional()
  @IsDate()
  endDate?: Date;
}
