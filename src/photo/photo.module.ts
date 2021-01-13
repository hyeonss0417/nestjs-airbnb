import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { photoProviders } from './photo.providers';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';

@Module({
    imports: [DatabaseModule],
    providers: [
        ...photoProviders,
        PhotoService,
    ],
    controllers: [PhotoController]
})
export class PhotoModule {}
