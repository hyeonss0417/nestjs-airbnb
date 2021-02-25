import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../rooms/entities/room.entity';
import { AppendListItemDto, CreateListDto } from './dto/create-list.dto';
import { List } from './entities/list.entity';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async create(userId: number, createListDto: CreateListDto): Promise<List> {
    const list = {
      owner: { id: userId },
      name: createListDto.name,
    };
    const exist = await this.listRepository.findOne(list);
    if (exist)
      throw new BadRequestException('이미 존재하는 리스트 이름입니다.');
    return await this.listRepository.create(list);
  }

  async append(
    userId: number,
    appendListItemDto: AppendListItemDto,
  ): Promise<List> {
    const list = await this.listRepository.findOneOrFail(appendListItemDto.id);
    const room = await this.roomRepository.findOneOrFail(
      appendListItemDto.roomId,
    );
    if (list.owner.id != userId)
      throw new UnauthorizedException('접근할 수 없습니다.');
    list.rooms = [...list.rooms, room];
    return await this.listRepository.save(list);
  }

  async getListsByUserId(userId: number): Promise<List[]> {
    return await this.listRepository.find({ owner: { id: userId } });
  }

  async findOne(id: number): Promise<List> {
    return await this.listRepository.findOneOrFail(id);
  }

  async delete(id: number) {
    await this.listRepository.findOneOrFail(id);
    return await this.listRepository.delete(id);
  }
}
