import { pool } from "../../db/index.js"

class UserBooksModels {
    async getUserBooksModel ({id}) {
        const query = `
            SELECT books.*, book_user.user_id 
            FROM books
            JOIN book_user
                ON books.id = book_user.book_id
            WHERE book_user.user_id = $1
        `
        
        const values = [id]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows
    }
}

export { UserBooksModels }