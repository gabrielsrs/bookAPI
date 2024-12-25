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

        return queryResponse.rows[0]
    }

    async addUserBookModel({ id, bookId }) {
        const query = `
            INSERT INTO book_user (user_id, book_id)
            VALUES ($1, $2)
            RETURNING *
        `

        const values = [id, bookId]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows[0]
    }

    async removeUserBookModel({ id, bookId }){
        const query = `
            DELETE FROM book_user
            WHERE user_id = $1 AND book_id = $2
            RETURNING *
        `

        const values = [id, bookId]
        
        const queryResponse = await pool.query(query, values)

        return queryResponse.rows[0]
    }
}

export { UserBooksModels }