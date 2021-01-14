import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PriceService } from './price.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';

@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Post()
  create(@Body() createPriceDto: CreatePriceDto) {
    return this.priceService.create(createPriceDto);
  }

  @Get()
  findAll() {
    return this.priceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.priceService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePriceDto: UpdatePriceDto) {
    return this.priceService.update(+id, updatePriceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.priceService.remove(+id);
  }
}
