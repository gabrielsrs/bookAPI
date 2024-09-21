import pg from "pg";

const pool = new pg.Pool({
    max: process.env["PGMAX"],
})

export { pool }