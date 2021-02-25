import { IsString } from 'class-validator';

export class CreateListDto {
  @IsString()
  name: string;
}

export class AppendListItemDto {
  @IsString()
  id: number;
  @IsString()
  roomId: number;
}
