import { pool } from "../../db/index.js"

class ExcerptsModels {
    async getBookExcerptsModel({id, bookId}) {
        const query = `
            SELECT * 
            FROM excerpts
            JOIN book_excerpt
                ON excerpts.id = book_excerpt.excerpt_id
            WHERE book_excerpt.user_id = $1 AND book_excerpt.book_id = $2
        `

        const values = [id, bookId]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows
        
    }

    async getBooksExcerptsModel({id}) {
        const query = `
            SELECT * 
            FROM excerpts
            JOIN book_excerpt
                ON excerpts.id = book_excerpt.excerpt_id
            WHERE book_excerpt.user_id = $1
        `

        const values = [id]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows
        
    }
}

export { ExcerptsModels }