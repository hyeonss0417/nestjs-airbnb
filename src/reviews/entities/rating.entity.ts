import { IsEnum, IsInt } from 'class-validator';
import { CoreEntity } from '../../common/entities/core.entity';
import { Check, Column, Entity, ManyToOne } from 'typeorm';
import { Review } from './review.entity';

export enum RatingCategory {
  CLEANNESS = 'CLEANNESS',
  ACCURACY = 'ACCURACY',
  COMMUNICATION = 'COMMUNICATION',
  LOCATION = 'LOCATION',
  CHECKIN = 'CHECKIN',
  PRICE = 'PRICE',
}

// registerEnumType(RatingCategory, { name: 'RatingCategory' }); for GraphQL

@Entity()
@Check(`star BETWEEN 0 AND 5`)
export class Rating extends CoreEntity {
  @ManyToOne(
    type => Review,
    review => review.ratings,
  )
  review: Review;

  @Column({ type: 'enum', enum: RatingCategory })
  @IsEnum(RatingCategory)
  category: RatingCategory;

  @Column({ type: 'int' })
  @IsInt()
  star: number;
}
