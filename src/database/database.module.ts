import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';

@Module({
    providers: [databaseProviders["DEV"]], // process.env.NODE_ENV
    exports: [databaseProviders["DEV"]]
})

export class DatabaseModule {}
