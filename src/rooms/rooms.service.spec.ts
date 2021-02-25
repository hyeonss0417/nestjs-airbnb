import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Photo } from '../common/entities/photo.entity';
import { mockRepository } from '../common/mocks/services.mock';
import { AmenityGroup, AmenityItem } from './entities/amenity.entity';
import { Room } from './entities/room.entity';
import { CustomRule, DetailChoice, RuleChoice } from './entities/rule.entity';
import { RoomsService } from './rooms.service';

describe('RoomsService', () => {
  let service: RoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsService,
        {
          provide: getRepositoryToken(Room),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(RuleChoice),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(CustomRule),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(DetailChoice),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(AmenityItem),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(AmenityGroup),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(Photo),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<RoomsService>(RoomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
