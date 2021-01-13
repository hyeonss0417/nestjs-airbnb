import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDTO } from './dto/createTodo.dto';
import { UpdateTodoDTO } from './dto/updateTodo.dto';
import { Todo } from './entity/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  async getTodolist(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async createTodo(createTodoDTO: CreateTodoDTO): Promise<Todo> {
    return await this.todoRepository.save(createTodoDTO);
  }

  async findById(id: number): Promise<Todo> {
    return await this.todoRepository.findOne({ id });
  }

  async editTodo(id: number, updateTodoDTO: UpdateTodoDTO): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ id });
    for (const key in updateTodoDTO) {
      todo[key] = updateTodoDTO[key];
    }
    return await this.todoRepository.save(todo);
  }

  async deleteTodo(id: number) {
    return await this.todoRepository.delete({ id });
  }
}
