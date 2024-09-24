import { pool } from "../../db/index.js"

class ReadLaterModels {
    async getReadLaterModel({id}) {
        const query = `
            SELECT * 
            FROM books
            JOIN read_later
                ON books.id = read_later.book_id
            WHERE read_later.user_id = $1
        `

        const values = [id]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows
    }
}

export { ReadLaterModels }