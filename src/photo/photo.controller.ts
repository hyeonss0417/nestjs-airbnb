import { Controller, Get, Inject } from '@nestjs/common';
import { Photo } from './entity/photo.entity';
import { PhotoService } from './photo.service';

@Controller('photo')
export class PhotoController {
    constructor(
        private readonly photoService: PhotoService
    ) {}

    @Get()
    async getPhotos(): Promise<Photo[]> {
        return await this.photoService.findAll();
    }
    
}
