import { Module } from '@nestjs/common';
import { databaseProviders } from './database.dev.providers';

@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders]
})

export class DatabaseModule {}
