import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { CreatePhotoDto } from './dtos/create-photo.dto';
import { Photo } from './entries/photo.entity';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  async insertPhotos(photos: CreatePhotoDto[]): Promise<ObjectLiteral[]> {
    return (await this.photoRepository.insert(photos)).identifiers;
  }
}
