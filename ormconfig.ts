import {ConnectionOptions} from "typeorm";

const config: ConnectionOptions = {
    type: 'postgres',
     url: process.env.DATABASE_URL,
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
    ssl:true
};

export default config;