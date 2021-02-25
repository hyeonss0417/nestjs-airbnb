import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { MockRepository } from '../common/mocks/interfaces.mock';
import { mockRepository } from '../common/mocks/services.mock';
import { CountriesService } from './countries.service';
import { Country, CountryName } from './entities/country.entity';

describe('CountriesService', () => {
  let service: CountriesService;
  let countryRepository: MockRepository<Country>;

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
    countryRepository = module.get(getRepositoryToken(Country));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const countryArgs = {
      name: CountryName.SouthKorea,
    };
    it('should create a country', async () => {
      countryRepository.findOne.mockResolvedValue(undefined);
      countryRepository.create.mockResolvedValue(countryArgs);

      const result = await service.create(countryArgs);
      expect(result).toEqual(countryArgs);

      expect(countryRepository.findOne).toHaveBeenCalledTimes(1);
      expect(countryRepository.findOne).toHaveBeenCalledWith(
        expect.any(Object),
      );
      expect(countryRepository.create).toHaveBeenCalledTimes(1);
      expect(countryRepository.create).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should fail if the country already exist', async () => {
      countryRepository.findOne.mockRejectedValue(
        new EntityNotFoundError(Country, {}),
      );
      countryRepository.create.mockResolvedValue(countryArgs);

      await expect(service.create(countryArgs)).rejects.toThrow(
        EntityNotFoundError,
      );
    });
  });

  describe('remove', () => {
    const countryArgs = {
      id: 1,
      name: CountryName.SouthKorea,
    };
    it('should remove the country', async () => {
      const id = 1;
      countryRepository.findOneOrFail.mockResolvedValue(null);
      countryRepository.delete.mockResolvedValue(null);

      await service.remove(countryArgs.id);

      expect(countryRepository.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(countryRepository.findOneOrFail).toHaveBeenCalledWith(
        countryArgs.id,
      );
      expect(countryRepository.delete).toHaveBeenCalledTimes(1);
      expect(countryRepository.delete).toHaveBeenCalledWith(countryArgs.id);
    });

    it('should fail if the country does not exist', async () => {
      countryRepository.findOneOrFail.mockRejectedValue(
        new EntityNotFoundError(Country, {}),
      );
      countryRepository.delete.mockResolvedValue(countryArgs);

      await expect(service.remove(countryArgs.id)).rejects.toThrow(
        EntityNotFoundError,
      );
    });
  });
});
