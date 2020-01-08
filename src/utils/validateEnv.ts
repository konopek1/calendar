import {cleanEnv, port, str,} from 'envalid';

export default function validateEnv() {
    cleanEnv(process.env, {
        MYSQL_HOST: str(),
        MYSQL_PASSWORD: str(),
        MYSQL_USER: str(),
        MYSQL_PORT: port(),
        MYSQL_DB: str(),
        JWT_SECRET: str()
    });
}

