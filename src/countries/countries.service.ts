import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCountryDto } from './dto/create-country.dto';
import { Country } from './entities/country.entity';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private readonly contryRepository: Repository<Country>,
  ) {}

  async create(createCountryDto: CreateCountryDto) {
    return await this.contryRepository.save(createCountryDto);
  }

  async findAll() {
    return await this.contryRepository.find();
  }

  async remove(id: number) {
    return await this.contryRepository.delete(id);
  }
}
