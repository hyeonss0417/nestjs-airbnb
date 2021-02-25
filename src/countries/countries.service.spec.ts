import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockRepository } from '../common/mocks/services.mock';
import { CountriesService } from './countries.service';
import { Country } from './entities/country.entity';

describe('CountriesService', () => {
  let service: CountriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountriesService,
        {
          provide: getRepositoryToken(Country),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<CountriesService>(CountriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
