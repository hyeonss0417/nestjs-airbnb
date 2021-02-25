import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { MockRepository } from '../common/mocks/interfaces.mock';
import { mockRepository } from '../common/mocks/services.mock';
import { Room } from '../rooms/entities/room.entity';
import { List } from './entities/list.entity';
import { ListsService } from './lists.service';

describe('ListsService', () => {
  let service: ListsService;
  let listRepository: MockRepository<List>;
  let roomRepository: MockRepository<Room>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListsService,
        {
          provide: getRepositoryToken(List),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(Room),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<ListsService>(ListsService);
    listRepository = module.get(getRepositoryToken(List));
    roomRepository = module.get(getRepositoryToken(Room));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const listArgs = {
      userId: 1,
      list: { name: 'French Rooms' },
    };
    it('should create a list', async () => {
      listRepository.findOne.mockResolvedValue(undefined);

      await service.create(listArgs.userId, listArgs.list);

      expect(listRepository.findOne).toHaveBeenCalledTimes(1);
      expect(listRepository.findOne).toHaveBeenCalledWith(expect.any(Object));
      expect(listRepository.create).toHaveBeenCalledTimes(1);
      expect(listRepository.create).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should fail if the list already exist', async () => {
      listRepository.findOne.mockResolvedValue(listArgs.list);

      await expect(
        service.create(listArgs.userId, listArgs.list),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('append', () => {
    const listArgs = {
      userId: 1,
      roomId: 12,
      list: { id: 1, name: 'French Rooms', rooms: [{ id: 10 }, { id: 11 }] },
    };
    it('should append a room to the list', async () => {
      const mockedList = {
        ...listArgs.list,
        owner: { id: listArgs.userId },
      };
      listRepository.findOneOrFail.mockResolvedValue(mockedList);
      const mockedRoom = {
        id: listArgs.roomId,
      };
      roomRepository.findOneOrFail.mockResolvedValue(mockedRoom);

      await service.append(listArgs.userId, {
        id: listArgs.list.id,
        roomId: listArgs.roomId,
      });

      expect(listRepository.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(listRepository.findOneOrFail).toHaveBeenCalledWith(
        listArgs.list.id,
      );
      expect(roomRepository.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(roomRepository.findOneOrFail).toHaveBeenCalledWith(
        listArgs.roomId,
      );
      expect(listRepository.save).toHaveBeenCalledTimes(1);
      expect(listRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          ...mockedList,
          rooms: [...listArgs.list.rooms, mockedRoom],
        }),
      );
    });

    it('should fail if the list does not exist', async () => {
      listRepository.findOneOrFail.mockRejectedValue(
        new EntityNotFoundError(List, {}),
      );

      await expect(
        service.append(listArgs.userId, {
          id: listArgs.list.id,
          roomId: listArgs.roomId,
        }),
      ).rejects.toThrow(EntityNotFoundError);
    });

    it('should fail if the room does not exist', async () => {
      roomRepository.findOneOrFail.mockRejectedValue(
        new EntityNotFoundError(List, {}),
      );

      await expect(
        service.append(listArgs.userId, {
          id: listArgs.list.id,
          roomId: listArgs.roomId,
        }),
      ).rejects.toThrow(EntityNotFoundError);
    });

    it('should fail if the user is not owner of the list', async () => {
      const mockedList = {
        ...listArgs.list,
        owner: { id: 999 },
      };
      listRepository.findOneOrFail.mockResolvedValue(mockedList);
      const mockedRoom = {
        id: listArgs.roomId,
      };
      roomRepository.findOneOrFail.mockResolvedValue(mockedRoom);

      await expect(
        service.append(listArgs.userId, {
          id: listArgs.list.id,
          roomId: listArgs.roomId,
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
