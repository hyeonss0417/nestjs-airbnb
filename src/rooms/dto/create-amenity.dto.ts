import { IsString } from 'class-validator';

export class CraeteAmenityGroupDTO {
  @IsString()
  name: string;
}

export class CraeteAmenityDTO {
  @IsString()
  name: string;

  @IsString()
  description?: string;

  @IsString()
  groupId: string;
}
