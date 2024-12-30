import { pool } from "../../db/index.js"

class UserBooksModels {
    async getUserBooksModel ({ userId }) {
        const query = `
            SELECT books.*, book_user.user_id 
            FROM books
            JOIN book_user
                ON books.id = book_user.book_id
            WHERE book_user.user_id = $1
        `
        
        const values = [userId]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows
    }

    async addUserBookModel({ userId, bookId }) {
        const query = `
            INSERT INTO book_user (user_id, book_id)
            VALUES ($1, $2)
            RETURNING *
        `

        const values = [userId, bookId]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows[0]
    }

    async removeUserBookModel({ userId, bookId }){
        const query = `
            DELETE FROM book_user
            WHERE user_id = $1 AND book_id = $2
            RETURNING *
        `

        const values = [userId, bookId]
        
        const queryResponse = await pool.query(query, values)

        return queryResponse.rows[0]
    }
}

export { UserBooksModels }