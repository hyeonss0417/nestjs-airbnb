import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsString, Length } from 'class-validator';
import { CreateTodoDTO } from './create-todo.dto';

export class UpdateTodoDTO extends PartialType(CreateTodoDTO) {}
