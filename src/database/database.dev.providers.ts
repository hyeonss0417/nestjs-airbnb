import { DATABASE_CONNECTION } from "src/constants";
import { createConnection } from "typeorm";

export const databaseProviders = [
    {
        provide: DATABASE_CONNECTION,
        useFactory: async () => await createConnection({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'phaphaya',
            database: 'nestjs_airbnb',
            entities: [
                __dirname + '/../**/*.entity{.ts,.js}',
            ],
            synchronize: true, // Should be false in production.
        })
    }
]

