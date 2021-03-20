import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';

@Module({
  exports: [TypeOrmModule],
  controllers: [],
  providers: [],
})
export class DatabaseModule {
  public static forRoot(option: TypeOrmModuleOptions): DynamicModule {
    initializeTransactionalContext();
    patchTypeORMRepositoryWithBaseRepository();

    return {
      imports: [TypeOrmModule.forRoot(option)],
      module: DatabaseModule,
    };
  }
}
