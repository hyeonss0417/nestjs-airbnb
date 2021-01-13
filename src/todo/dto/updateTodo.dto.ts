import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsString, Length } from 'class-validator';

class _UpdateTodoDTO {
  @IsString()
  @Length(1, 50)
  shortDesc: string;

  @IsString()
  @Length(1, 100)
  longDesc: string;

  @IsBoolean()
  isDone: boolean;
}

export class UpdateTodoDTO extends PartialType(_UpdateTodoDTO) {}
