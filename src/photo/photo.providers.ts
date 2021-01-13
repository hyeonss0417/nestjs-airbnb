import { DATABASE_CONNECTION, PHOTO_REPOSITORY } from "src/constants";
import { Connection } from "typeorm";
import { Photo } from "./entity/photo.entity";

export const photoProviders = [
    {
        provide: PHOTO_REPOSITORY,
        useFactory: (connection: Connection) => connection.getRepository(Photo),
        inject: [DATABASE_CONNECTION],
    }
]