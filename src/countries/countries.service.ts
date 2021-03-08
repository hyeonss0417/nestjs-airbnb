import { BadRequestException, Injectable } from '@nestjs/common';
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
    const exist = await this.contryRepository.findOne(createCountryDto);
    if (exist) throw new BadRequestException('이미 존재하는 나라입니다.');
    return await this.contryRepository.insert(createCountryDto);
  }

  async findAll() {
    return await this.contryRepository.find();
  }

  async remove(id: number) {
    await this.contryRepository.findOneOrFail(id);
    return await this.contryRepository.delete(id);
  }
}
