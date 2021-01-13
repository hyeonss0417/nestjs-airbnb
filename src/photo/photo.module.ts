import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { photoProviders } from './photo.providers';
import { PhotoService } from './photo.service';

@Module({
    imports: [DatabaseModule],
    providers: [
        ...photoProviders,
        PhotoService,
    ]
})
export class PhotoModule {}
