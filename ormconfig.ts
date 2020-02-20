import {ConnectionOptions} from "typeorm";

const config: ConnectionOptions = {
    type: 'mysql',
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
    database:process.env.MYSQL_DB,
    username:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    host:process.env.MYSQL_HOST,
    port:Number(process.env.MYSQL_PORT)
};

export default config;