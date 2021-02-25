import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ListsService } from './lists.service';
import { AppendListItemDto, CreateListDto } from './dto/create-list.dto';
import { List } from './entities/list.entity';
import { User } from '../users/entities/user.entity';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  async create(
    @Req() { user }: { user: User },
    @Body() createListDto: CreateListDto,
  ): Promise<List> {
    return await this.listsService.create(user.id, createListDto);
  }

  @Get()
  async append(
    @Req() { user }: { user: User },
    @Body() appendListItemDto: AppendListItemDto,
  ): Promise<List> {
    return await this.listsService.append(user.id, appendListItemDto);
  }

  @Get()
  async getMyLists(@Req() { user }: { user: User }): Promise<List[]> {
    return await this.listsService.getListsByUserId(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<List> {
    return await this.listsService.findOne(+id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.listsService.delete(+id);
  }
}
