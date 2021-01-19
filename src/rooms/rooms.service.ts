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

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  async create(createRoomDto: CreateRoomDto) {
    const { hostId, countryId, ...rest } = createRoomDto;

    const host = new User();
    host.id = +hostId;

    const country = new Country();
    country.id = +countryId;

    const room = await this.roomRepository.create({
      host,
      country,
      ...rest,
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
