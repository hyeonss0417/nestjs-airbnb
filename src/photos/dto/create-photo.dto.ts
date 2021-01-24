import { IsString, IsUrl } from 'class-validator';

export class CreatePhotoDto {
  @IsUrl()
  url: string;

  @IsString()
  caption?: string;
}
