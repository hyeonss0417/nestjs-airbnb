import { IsString } from 'class-validator';

export class CreatePhotoDto {
  @IsString()
  url: string;

  @IsString()
  caption?: string;
}
