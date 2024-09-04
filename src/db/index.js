import { Pool } from "pg";

const pool = new Pool({
    user: process.env["USER"],
    database: process.env["DATABASE"],
    port: process.env["PORTDB"],
    host: process.env["HOST"],
    password: process.env["PASSWORD"],
    max: process.env["MAX"],
})

export { pool }