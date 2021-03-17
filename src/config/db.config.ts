import { Verification } from '../auth/entities/varification.entity';
import { Conversation } from '../common/entities/conversation.entity';
import { Message } from '../common/entities/message.entity';
import { Payment } from '../common/entities/payment.entity';
import { Country } from '../countries/entities/country.entity';
import { Discount } from '../discounts/entities/discount.entity';
import { List } from '../lists/entities/list.entity';
import { Photo } from '../photos/entries/photo.entity';
import { Reservation } from '../reservations/entities/reservation.entity';
import { Rating } from '../reviews/entities/rating.entity';
import { Review } from '../reviews/entities/review.entity';
import { Room } from '../rooms/entities/room.entity';
import { AmenityGroup, AmenityItem } from '../rooms/entities/amenity.entity';
import {
  CustomRule,
  Detail,
  DetailChoice,
  Rule,
  RuleChoice,
} from '../rooms/entities/rule.entity';
import { User } from '../users/entities/user.entity';
import { Role } from '../users/entities/role.entity';

export default () => ({
  type: 'mysql' as const,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dropSchema: process.env.NODE_ENV === 'test',
  synchronize: true, //process.env.NODE_ENV !== 'prod',
  logging: process.env.NODE_ENV === 'dev',
  entities: [
    Country,
    List,
    Discount,
    Reservation,
    Verification,
    Review,
    Rating,
    Photo,
    User,
    Role,
    Conversation,
    Message,
    Payment,
    AmenityGroup,
    AmenityItem,
    Room,
    Rule,
    RuleChoice,
    CustomRule,
    Detail,
    DetailChoice,
  ],
});
