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
import { Facility } from './entities/facility.entity';
import { Rule } from './entities/rule.entity';
import { Amenity } from './entities/amenity.entity';
import { Photo } from '../photos/entities/photo.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(Facility)
    private readonly facilityRepository: Repository<Facility>,
    @InjectRepository(Rule)
    private readonly ruleRepository: Repository<Rule>,
    @InjectRepository(Amenity)
    private readonly amenityRepository: Repository<Amenity>,
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  async create(createRoomDto: CreateRoomDto, host: User) {
    const {
      countryId,
      photos,
      facilities,
      rules,
      amenities,
      ...rest
    } = createRoomDto;

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
      facilities: await Promise.all(
        facilities.map(
          facility =>
            this.facilityRepository.findOne({ name: facility.name }) ||
            this.facilityRepository.save(facility),
        ),
      ),
      rules: await Promise.all(
        rules.map(rule => this.ruleRepository.save(rule)),
      ),
      amenities: await Promise.all(
        amenities.map(
          amenity =>
            this.amenityRepository.findOne({ name: amenity.name }) ||
            this.amenityRepository.save(amenity),
        ),
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
