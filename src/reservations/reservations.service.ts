import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReserveRoomDTO } from '../rooms/dto/reserve-room.dto';
import { Room } from '../rooms/entities/room.entity';
import { User } from '../users/entities/user.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation, ReservationStatus } from './entities/reservation.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  async reserve(
    guest: User,
    reserveRoomDTO: ReserveRoomDTO,
  ): Promise<Reservation> {
    const reservation = this.reservationRepository.create({
      guests: [{ id: guest.id }],
      room: { id: reserveRoomDTO.roomId },
      ...reserveRoomDTO,
    });

    const room = await this.roomRepository.findOne(reserveRoomDTO.roomId);
    await room.validateReservation(reservation);

    return await this.reservationRepository.save(reservation);
  }

  findAll() {
    return `This action returns all reservations`;
  }

  async findOne(id: number): Promise<Reservation> {
    return await this.reservationRepository.findOneOrFail(id);
  }

  async cancel(id: number) {
    try {
      const reservation = await this.reservationRepository.findOneOrFail(id);
      reservation.status = ReservationStatus.CANCELED;
      this.reservationRepository.save(reservation);
    } catch (e) {
      throw new NotFoundException('존재하지 않는 예약 정보입니다.');
    }
  }
}
