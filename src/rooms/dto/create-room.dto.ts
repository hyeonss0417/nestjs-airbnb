import {
  IsEnum,
  IsInt,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreatePhotoDto } from '../../photos/dto/create-photo.dto';
import { RoomType } from '../entities/room.entity';

export class CreateRoomDto {
  @IsString()
  hostId: string;

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

  @ValidateNested()
  photos: CreatePhotoDto[];

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

  // ===== Options =====
  @ValidateNested()
  facilities?: CraeteFacilityDto[];

  @ValidateNested()
  rules?: CraeteRuleDto[];

  @ValidateNested()
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
