import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { CustomRule, DetailChoice, RuleChoice } from './entities/rule.entity';
import { AmenityGroup, AmenityItem } from './entities/amenity.entity';
import {
  CraeteAmenityItemDTO,
  CraeteAmenityGroupDTO,
} from './dto/create-amenity.dto';
import { DiscountType } from '../discounts/entities/discount.entity';
import { PhotosService } from '../photos/photos.service';
import { DiscountsService } from '../discounts/discounts.service';

@Injectable()
export class RoomsService {
  constructor(
    private readonly photosService: PhotosService,
    private readonly discountsService: DiscountsService,
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
  ) {}

  async create(host: User, createRoomDto: CreateRoomDto): Promise<any> {
    const {
      countryId,
      photos,
      amenityItemIds,
      ruleChoices,
      customRules,
      detailChoices,
      weekDiscountRate,
      monthDiscountRate,
      ...rest
    } = createRoomDto;

    const room = (
      await this.roomRepository.insert({
        host,
        country: { id: countryId },
        amenities: amenityItemIds.map(id => ({ id })),
        ...rest,
      })
    ).generatedMaps[0] as { id: number };

    // TODO: CHECK Whether User is Host or not

    await Promise.all([
      this.photosService.insertPhotos(
        photos.map(photo => ({ ...photo, room: { id: room.id } })),
      ),
      this.discountsService.insertDiscounts([
        {
          type: DiscountType.Week,
          percent: weekDiscountRate,
          room: { id: room.id },
        },
        {
          type: DiscountType.Month,
          percent: monthDiscountRate,
          room: { id: room.id },
        },
      ]),
      this.ruleChoiceRepository.insert(
        ruleChoices.map(({ ruleId, ...rest }) => ({
          room: { id: room.id },
          rule: { id: ruleId },
          ...rest,
        })),
      ),
      this.customRuleRepository.insert(
        customRules.map(title => ({ room: { id: room.id }, title })),
      ),
      this.detailChoiceRepository.insert(
        detailChoices.map(({ detailId, ...rest }) => ({
          detail: { id: detailId },
          ...rest,
        })),
      ),
    ]);

    return room;
  }

  async findAll(): Promise<Room[]> {
    return await this.roomRepository.find();
  }

  async findOne(id: number): Promise<Room> {
    const room = await this.roomRepository.findOneOrFail(id, {
      relations: ['reservations', 'discounts', 'country', 'photos'],
    });
    return room;
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
