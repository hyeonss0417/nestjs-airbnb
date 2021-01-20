import { Type } from 'class-transformer';
import {
  IsArray,
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
  @Type(() => CraeteRuleDto)
  rules?: CraeteRuleDto[];

  @IsString({ each: true })
  amenityIds: string[];
  // ====================
}

export class CraeteRuleDto {
  @IsString()
  name: string;

  @IsString()
  description?: string;
}
