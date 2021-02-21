import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../rooms/entities/room.entity';
import { User } from '../users/entities/user.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
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
    reserveRoomDTO: CreateReservationDto,
  ): Promise<Reservation> {
    const reservation = this.reservationRepository.create({
      ...reserveRoomDTO,
      guests: [{ id: guest.id }],
      room: { id: reserveRoomDTO.roomId },
      checkIn: new Date(reserveRoomDTO.checkIn),
      checkOut: new Date(reserveRoomDTO.checkOut),
    });

    const room = await this.roomRepository.findOneOrFail(
      reserveRoomDTO.roomId,
      {
        relations: ['reservations', 'discounts', 'country'],
      },
    );
    await room.validateReservation(reservation);

    reservation.status = ReservationStatus.REQUESTED;
    return await this.reservationRepository.save(reservation);
  }

  async findAll() {
    return await this.reservationRepository.find();
  }

  async findOne(id: number): Promise<Reservation> {
    return await this.reservationRepository.findOneOrFail(id);
  }

  async cancel(id: number) {
    const reservation = await this.reservationRepository.findOneOrFail(id);
    reservation.status = ReservationStatus.CANCELED;
    await this.reservationRepository.save(reservation);
  }
}
