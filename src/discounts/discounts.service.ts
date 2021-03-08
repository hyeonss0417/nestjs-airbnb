import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { CreateDiscountDTO } from './dtos/create-discount.dto';
import { Discount } from './entities/discount.entity';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(Discount)
    private readonly discountsRepository: Repository<Discount>,
  ) {}

  async insertDiscounts(
    discounts: CreateDiscountDTO[],
  ): Promise<ObjectLiteral[]> {
    return (await this.discountsRepository.insert(discounts)).identifiers;
  }
}
