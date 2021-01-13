import { Inject, Injectable } from '@nestjs/common';
import { PHOTO_REPOSITORY } from 'src/constants/constants';
import { Repository } from 'typeorm';
import { Photo } from './entity/photo.entity';

@Injectable()
export class PhotoService {
    constructor(
        @Inject(PHOTO_REPOSITORY)
        private photoRepository: Repository<Photo>,
    ) {}

    async findAll(): Promise<Photo[]> {
        return this.photoRepository.find();
    }
}
