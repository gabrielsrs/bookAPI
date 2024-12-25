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

        return queryResponse.rows[0]
    }

    async createReadLaterModel({ items: {
        id,
        userId,
        bookId,
        privacy,
        updatedAt
    } }) {
        const query = `
            INSERT INTO read_later (id, book_id, user_id, privacy, updated_at)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `

        const values = [id, bookId, userId, privacy, updatedAt]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows[0]
    }

    async deleteReadLaterModel({ userId, bookId }) {
        const query = `
            DELETE FROM read_later
            WHERE book_id = $1 AND user_id = $2
            RETURNING id
        `

        const values = [bookId, userId]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows[0]
    }
}

export { ReadLaterModels }