import { Module } from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { DiscountsController } from './discounts.controller';

@Module({
  controllers: [DiscountsController],
  providers: [DiscountsService]
})
export class DiscountsModule {}
