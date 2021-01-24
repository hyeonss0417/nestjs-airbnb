import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from '../reservations/entities/reservation.entity';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
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
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  async create(createRoomDto: CreateRoomDto, host: User) {
    const {
      countryId,
      photos: _photos,
      amenityItemIds,
      ruleChoices: _ruleChoices,
      customRules: _customRules,
      detailChoices: _detailChoices,
      ...rest
    } = createRoomDto;

    // TODO: HOST CHECK

    const country = new Country();
    country.id = countryId;

    const photos = await this.photoRepository.save(_photos);
    const ruleChoices = await this.ruleChoiceRepository.save(
      _ruleChoices.map(({ ruleId, isOkay, description }) => {
        const rule = new Rule();
        rule.id = ruleId;
        return { rule, isOkay, description };
      }),
    );

    const customRules = await this.customRuleRepository.save(
      _customRules.map(title => ({
        title,
      })),
    );

    const detailChoices = await this.detailChoiceRepository.save(
      _detailChoices.map(({ detailId, explain }) => {
        const detail = new Detail();
        detail.id = detailId;
        return { detail, explain };
      }),
    );

    const room = await this.roomRepository.create({
      ...rest,
      host,
      country,
      photos,
      ruleChoices,
      customRules,
      detailChoices,
      amenities: await this.AmenityItemRepository.findByIds(amenityItemIds),
    });
    return await this.roomRepository.save(room);
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

  async reserve(
    roomId: number,
    reserveRoomDTO: ReserveRoomDTO,
    guest: User,
  ): Promise<Reservation> {
    const room = await this.roomRepository.findOne(roomId);
    const reservation = room.reserve(reserveRoomDTO, guest);
    return await this.reservationRepository.create(reservation);
  }
}
