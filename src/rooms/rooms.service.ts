import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Reservation } from '../reservations/entities/reservation.entity';
import { User } from '../users/entities/user.entity';
import { Connection, Repository, Transaction } from 'typeorm';
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
    @InjectRepository(AmenityItem)
    private readonly AmenityItemRepository: Repository<AmenityItem>,
    @InjectRepository(AmenityGroup)
    private readonly AmenityGroupRepository: Repository<AmenityGroup>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectConnection()
    private readonly connection: Connection,
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

    let result;
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // TODO: CHECK Whether User is Host or not

      await this.connection.manager.insert(Photo, photos);
      const { identifiers: ruleChoices } = await this.connection.manager.insert(
        RuleChoice,
        _ruleChoices.map(({ ruleId, ...rest }) => ({
          rule: { id: ruleId },
          ...rest,
        })),
      );
      const { identifiers: customRules } = await this.connection.manager.insert(
        CustomRule,
        _customRules.map(title => ({ title })),
      );
      const {
        identifiers: detailChoices,
      } = await this.connection.manager.insert(
        DetailChoice,
        _detailChoices.map(({ detailId, ...rest }) => ({
          detail: { id: detailId },
          ...rest,
        })),
      );

      const room = await this.connection.manager.create(Room, {
        ...rest,
        host,
        country: { id: countryId },
        photos,
        ruleChoices,
        customRules,
        detailChoices,
        amenities: amenityItemIds.map(id => ({ id })),
      });

      result = (await this.connection.manager.insert(Room, room)).generatedMaps;
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }

    return result;
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
