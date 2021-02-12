import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Reservation } from '../reservations/entities/reservation.entity';
import { User } from '../users/entities/user.entity';
import { Connection, EntityManager, Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { ReserveRoomDTO } from './dto/reserve-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { Country } from '../countries/entities/country.entity';
import {
  CustomRule,
  Detail,
  DetailChoice,
  Rule,
  RuleChoice,
} from './entities/rule.entity';
import { AmenityGroup, AmenityItem } from './entities/amenity.entity';
import { Photo } from '../photos/entities/photo.entity';
import {
  CraeteAmenityItemDTO,
  CraeteAmenityGroupDTO,
} from './dto/create-amenity.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(RuleChoice)
    private readonly ruleChoiceRepository: Repository<RuleChoice>,
    @InjectRepository(DetailChoice)
    private readonly detailChoiceRepository: Repository<DetailChoice>,
    @InjectRepository(CustomRule)
    private readonly customRuleRepository: Repository<CustomRule>,
    @InjectRepository(AmenityItem)
    private readonly AmenityItemRepository: Repository<AmenityItem>,
    @InjectRepository(AmenityGroup)
    private readonly AmenityGroupRepository: Repository<AmenityGroup>,
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  async create(createRoomDto: CreateRoomDto, host: User): Promise<any> {
    const {
      countryId,
      photos,
      amenityItemIds,
      ruleChoices: _ruleChoices,
      customRules: _customRules,
      detailChoices: _detailChoices,
      ...rest
    } = createRoomDto;

    // TODO: CHECK Whether User is Host or not
    await this.photoRepository.insert(photos);
    const { identifiers: ruleChoices } = await this.ruleChoiceRepository.insert(
      _ruleChoices.map(({ ruleId, ...rest }) => ({
        rule: { id: ruleId },
        ...rest,
      })),
    );
    const { identifiers: customRules } = await this.customRuleRepository.insert(
      _customRules.map(title => ({ title })),
    );
    const {
      identifiers: detailChoices,
    } = await this.detailChoiceRepository.insert(
      _detailChoices.map(({ detailId, ...rest }) => ({
        detail: { id: detailId },
        ...rest,
      })),
    );

    const room = this.roomRepository.create({
      ...rest,
      host,
      country: { id: countryId },
      photos,
      ruleChoices,
      customRules,
      detailChoices,
      amenities: amenityItemIds.map(id => ({ id })),
    });
    return (await this.roomRepository.insert(room)).generatedMaps;
  }

  findAll() {
    return `This action returns all rooms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }

  async findAllAmenities(): Promise<AmenityItem[]> {
    return await this.AmenityItemRepository.find();
  }

  async createAmenityItem(
    createAmentityDTO: CraeteAmenityItemDTO,
  ): Promise<AmenityItem> {
    return await this.AmenityItemRepository.save(createAmentityDTO);
  }

  async createAmenityGroup(
    createAmenityGroupDTO: CraeteAmenityGroupDTO,
  ): Promise<AmenityGroup> {
    return await this.AmenityGroupRepository.save(createAmenityGroupDTO);
  }
}
