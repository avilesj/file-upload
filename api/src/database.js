import pg from "pg";
const Pool = pg.Pool;
const databaseConfig = {
    user: '',
    host: '',
    database: '',
    password: '',
    port: 5432
}

const connection = new Pool(databaseConfig);

export const database = {
    getConnection: () => connection,
}
