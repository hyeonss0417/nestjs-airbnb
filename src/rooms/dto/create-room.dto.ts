import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IsNonPrimitiveArray } from '../../common/class-validator';
import { CreatePhotoDto } from '../../photos/dto/create-photo.dto';
import { RoomType } from '../entities/room.entity';

export class CreateRoomDto {
  @IsEnum(RoomType)
  roomType: RoomType;

  @IsInt()
  price: number;

  @IsInt()
  cleaningFee?: number;

  @IsInt()
  roomCnt: number;

  @IsInt()
  bedCnt: number;

  @IsNumber()
  bathCnt: number;

  @IsInt()
  maxGuestCnt: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  countryId: string;

  // ===== Address =====
  @IsString()
  addressState: string;

  @IsString()
  addressCity: string;

  @IsString()
  addressStreet: string;

  @IsString()
  addressEtc?: string;

  @IsString()
  addressZipCode: string;

  // ===============
  @ValidateNested({ each: true })
  @IsNonPrimitiveArray()
  @Type(() => CreatePhotoDto)
  photos: CreatePhotoDto[];

  // ===== Options =====
  @ValidateNested({ each: true })
  @IsNonPrimitiveArray()
  @Type(() => CraeteFacilityDto)
  facilities?: CraeteFacilityDto[];

  @ValidateNested({ each: true })
  @IsNonPrimitiveArray()
  @Type(() => CraeteRuleDto)
  rules?: CraeteRuleDto[];

  @ValidateNested({ each: true })
  @IsNonPrimitiveArray()
  @Type(() => CraeteAmenityDTO)
  amenities?: CraeteAmenityDTO[];
  // ====================
}

export class CraeteFacilityDto {
  @IsString()
  name: string;

  @IsString()
  description?: string;
}

export class CraeteRuleDto {
  @IsString()
  name: string;

  @IsString()
  description?: string;
}

export class CraeteAmenityDTO {
  @IsString()
  name: string;

  @IsString()
  description?: string;
}
