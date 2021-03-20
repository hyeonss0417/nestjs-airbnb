import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IsNonPrimitiveArray } from '../../common/middlewares/class-validator';
import { CreatePhotoDto } from '../../photos/dtos/create-photo.dto';
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

  @IsNumber()
  countryId: number;

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

  @IsNumber()
  @IsOptional()
  weekDiscountRate: number;

  @IsNumber()
  @IsOptional()
  monthDiscountRate: number;

  // ===============
  @ValidateNested({ each: true })
  @IsNonPrimitiveArray()
  @Type(() => CreatePhotoDto)
  photos: CreatePhotoDto[];

  // ===== Options =====
  @ValidateNested({ each: true })
  @IsNonPrimitiveArray()
  @Type(() => CraeteRuleChoiceDto)
  ruleChoices: CraeteRuleChoiceDto[];

  @IsString({ each: true })
  customRules?: string[];

  @ValidateNested({ each: true })
  @IsNonPrimitiveArray()
  @Type(() => CraeteDetailChoiceDto)
  detailChoices?: CraeteDetailChoiceDto[];

  @IsNumber({}, { each: true })
  amenityItemIds: number[];
  // ====================
}

export class CraeteRuleChoiceDto {
  @IsNumber()
  ruleId: number;

  @IsBoolean()
  isOkay: boolean;

  @IsString()
  description?: string;
}

export class CraeteDetailChoiceDto {
  @IsNumber()
  detailId: number;

  @IsString()
  explain?: string;
}
