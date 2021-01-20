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
import { Rule } from './entities/rule.entity';
import { AmenityGroup, Amenity } from './entities/amenity.entity';
import { Photo } from '../photos/entities/photo.entity';
import {
  CraeteAmenityDTO,
  CraeteAmenityGroupDTO,
} from './dto/create-amenity.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(Rule)
    private readonly ruleRepository: Repository<Rule>,
    @InjectRepository(Amenity)
    private readonly amenityRepository: Repository<Amenity>,
    @InjectRepository(AmenityGroup)
    private readonly amenityGroupRepository: Repository<AmenityGroup>,
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  async create(createRoomDto: CreateRoomDto, host: User) {
    const { countryId, photos, rules, amenityIds, ...rest } = createRoomDto;

    // TODO: HOST CHECK

    // TODO: checke uniqueness of rules, amenities

    const country = new Country();
    country.id = +countryId;

    const room = await this.roomRepository.create({
      ...rest,
      host,
      photos: await Promise.all(
        photos.map(photo => this.photoRepository.save(photo)),
      ),
      rules: await Promise.all(
        rules.map(rule => this.ruleRepository.save(rule)),
      ),
      amenities: await this.amenityRepository.findByIds(
        amenityIds.map(id => +id),
      ),
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

  async findAllAmenities(): Promise<Amenity[]> {
    return await this.amenityRepository.find();
  }

  async createAmenity(createAmentityDTO: CraeteAmenityDTO): Promise<Amenity> {
    return await this.amenityRepository.save(createAmentityDTO);
  }

  async createAmenityGroup(
    createAmenityGroupDTO: CraeteAmenityGroupDTO,
  ): Promise<AmenityGroup> {
    return await this.amenityGroupRepository.save(createAmenityGroupDTO);
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
