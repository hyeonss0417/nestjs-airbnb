import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhotoService } from './photo/photo.service';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [PhotoModule],
  controllers: [AppController],
  providers: [AppService, PhotoService],
})
export class AppModule {}
 