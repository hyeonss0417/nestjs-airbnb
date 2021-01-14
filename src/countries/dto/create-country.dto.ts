import { IsEnum } from 'class-validator';
import { CountryName } from '../entities/country.entity';

export class CreateCountryDto {
  @IsEnum(CountryName)
  name: CountryName;
}
