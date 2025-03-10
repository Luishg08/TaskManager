import pg from 'pg';
import { DATABASE_PG, HOST_PG, PASSWORD_PG, PORT_PG, USER_PG } from '../config/config.js';

export const pool = new pg.Pool({
    user: USER_PG,
    password: PASSWORD_PG,
    host: HOST_PG,
    port: PORT_PG,
    database: DATABASE_PG  
})