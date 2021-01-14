import { IsEnum, IsInt, IsNumber, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Country } from 'src/countries/entities/country.entity';
import { Discount } from 'src/discounts/entities/discount.entity';
import { List } from 'src/lists/entities/list.entity';
import { Photo } from 'src/photos/entities/photo.entity';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Amenity } from './amenity.entity';
import { Facility } from './facility.entity';
import { Rule } from './rule.entity';

export enum RoomType {
  Apartment = 'Apartment',
  House = 'House',
  SecondaryUnit = 'SecondaryUnit',
  UniqueSpace = 'UniqueSpace',
  BedAndBreakfast = 'BedAndBreakfast',
  BoutiqueHotel = 'BoutiqueHotel',
}

@Entity()
export class Room extends CoreEntity {
  @ManyToOne(
    type => User,
    user => user.rooms,
  )
  host: User;

  @Column({ type: 'enum', enum: RoomType })
  @IsEnum(RoomType)
  roomType: RoomType;

  @Column()
  price: number;

  @ManyToMany(
    type => Discount,
    discount => discount.rooms,
  )
  discounts: Discount[];

  @Column({ nullable: true })
  cleaningFee: number;

  @Column({ type: 'int' })
  @IsInt()
  roomCnt: number;

  @Column({ type: 'int' })
  @IsInt()
  bedCnt: number;

  @Column({ type: 'float' })
  @IsNumber()
  bathCnt: number;

  @Column({ type: 'int' })
  @IsInt()
  maxGuestCnt: number;

  @Column()
  @IsString()
  title: string;

  @Column({ type: 'text' })
  @IsString()
  description: string;

  @OneToMany(
    type => Photo,
    photo => photo.room,
  )
  photos: Photo[];

  // ===== Address =====
  @ManyToOne(
    type => Country,
    country => country.rooms,
  )
  addressCountry: Country;

  @Column()
  @IsString()
  addressState: string;

  @Column()
  @IsString()
  addressCity: string;

  @Column()
  @IsString()
  addressStreet: string;

  @Column({ nullable: true })
  @IsString()
  addressEtc: string;

  @Column()
  @IsString()
  addressZipCode: string;
  // ====================

  // ===== Options =====
  @ManyToMany(
    type => Facility,
    facility => facility.rooms,
  )
  facilities: Facility[];

  @ManyToMany(
    type => Rule,
    facility => facility.rooms,
  )
  rules: Rule[];

  @ManyToMany(
    type => Amenity,
    amenity => amenity.rooms,
  )
  amenities: Amenity[];
  // ====================

  // Inverse Side Relation
  @OneToMany(
    type => Reservation,
    reservation => reservation.room,
  )
  reservatons: Reservation[];

  @OneToMany(
    type => Review,
    review => review.room,
  )
  reviews: Review[];

  @ManyToMany(
    type => List,
    list => list.rooms,
  )
  lists: List[];

  calculateTotalPrice(): number {
    return 0;
  }
}
