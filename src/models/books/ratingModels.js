import { pool } from "../../db/index.js"

class RatingModels {
    async getRatingsModel ({id}) {
        const query = `
            SELECT ratings.*, book_rate.book_id 
            FROM ratings
            JOIN book_rate
                ON ratings.id = book_rate.rate_id
            WHERE book_rate.book_id = $1
        `
        const values = [id]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows
    }
}

export { RatingModels }