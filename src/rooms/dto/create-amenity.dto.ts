import { IsString } from 'class-validator';

export class CraeteAmenityGroupDTO {
  @IsString()
  name: string;
}

export class CraeteAmenityItemDTO {
  @IsString()
  name: string;

  @IsString()
  description?: string;

  @IsString()
  groupId: string;
}
