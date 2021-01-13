import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),PhotoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
 