import { DATABASE_CONNECTION_DEV, DATABASE_CONNECTION_TEST, DATABASE_CONNECTION_PROD } from "src/constants";
import { createConnection } from "typeorm";

export const databaseProviders = {
    'DEV': {
        provide: DATABASE_CONNECTION_DEV,
        useFactory: async () => await createConnection({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME_DEV,
            entities: [
                __dirname + '/../**/*.entity{.ts,.js}',
            ],
            synchronize: true,
        })
    },
    'TEST': {
        provide: DATABASE_CONNECTION_TEST,
        useFactory: async () => await createConnection({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME_TEST,
            entities: [
                __dirname + '/../**/*.entity{.ts,.js}',
            ],
            synchronize: true,
        })
    },
    'PROD': {
        provide: DATABASE_CONNECTION_PROD,
        useFactory: async () => await createConnection({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME_PROD,
            entities: [
                __dirname + '/../**/*.entity{.ts,.js}',
            ],
            synchronize: false,
        })
    },
}