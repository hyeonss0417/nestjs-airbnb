import { Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';

@Module({
  controllers: [PriceController],
  providers: [PriceService]
})
export class PriceModule {}
