import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class CreateTodoDTO {
  @IsString()
  @Length(1, 50)
  shortDesc: string;

  @IsString()
  @IsOptional()
  @Length(1, 100)
  longDesc: string;

  @IsOptional()
  @IsBoolean()
  isDone: boolean;
}
