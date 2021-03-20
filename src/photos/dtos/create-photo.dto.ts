import { IsString, IsUrl } from 'class-validator';
import { Room } from '../../rooms/entities/room.entity';

export class CreatePhotoDto {
  @IsUrl()
  url: string;

  @IsString()
  caption?: string;

  room?: { id: number };
}
