import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';

@Module({
  controllers: [ListsController],
  providers: [ListsService]
})
export class ListsModule {}
