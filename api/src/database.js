import pg from "pg";
const Pool = pg.Pool;
const databaseConfig = {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
}

const connection = new Pool(databaseConfig);

export const database = {
    getConnection: () => connection,
}
