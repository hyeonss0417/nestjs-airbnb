import { DynamicModule, Global, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { ReservationsModule } from './reservations/reservations.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ListsModule } from './lists/lists.module';
import { AuthModule } from './auth/auth.module';
import { CountriesModule } from './countries/countries.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { MailModule } from './mail/mail.module';
import { PhotosModule } from './photos/photos.module';
import { DiscountsModule } from './discounts/discounts.module';
import { LoggingInterceptor } from './common/interceptors/logging.intercepter';
import { EntityNotFoundError } from 'typeorm';
import configuration from './config/configuration';
import { DatabaseModule } from './config/db.module';
import dbConfig from './config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot(configuration()),
    DatabaseModule.forRoot(dbConfig()),
    UsersModule,
    RoomsModule,
    ReservationsModule,
    ReviewsModule,
    ListsModule,
    CountriesModule,
    AuthModule,
    MailModule,
    PhotosModule,
    DiscountsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
    {
      provide: APP_FILTER,
      useClass: EntityNotFoundError,
    },
  ],
})
export class AppModule {}
