import pg from "pg";
const Pool = pg.Pool;
const databaseConfig = {
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DB,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
}

const connection = new Pool(databaseConfig);


export const getConnection = () => connection;
