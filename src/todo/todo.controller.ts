import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTodolist(): Promise<Todo[]> {
    return this.todoService.getTodolist();
  }

  @Post()
  async createTodo(@Body() createTodoDTO: CreateTodoDTO): Promise<Todo> {
    return this.todoService.createTodo(createTodoDTO);
  }

  @Get(':id')
  async findById(@Param('id') todoId: number): Promise<Todo> {
    return this.todoService.findById(todoId);
  }

  @Patch(':id')
  async editTodo(
    @Body() updateTodoDTO: UpdateTodoDTO,
    @Param('id') todoId: number,
  ): Promise<Todo> {
    return this.todoService.editTodo(todoId, updateTodoDTO);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') todoId: number) {
    return this.todoService.deleteTodo(todoId);
  }
}
