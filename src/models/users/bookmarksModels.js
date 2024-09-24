import { pool } from "../../db/index.js"

class BookmarksModels {
    async getBookBookmarksModel({id, bookId}) {
        const query = `
            SELECT bookmark.id, lower(book_locale.page) as page, bookmark.book_id, bookmark.user_id, bookmark.privacy
            FROM bookmark
            JOIN book_locale
                ON bookmark.book_locale_id = book_locale.id
            WHERE user_id = $1 AND book_id = $2
        `

        const values = [id, bookId]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows
        
    }

    async getBooksBookmarksModel({id}) {
        const query = `
            SELECT bookmark.id, lower(book_locale.page) as page, bookmark.book_id, bookmark.user_id, bookmark.privacy
            FROM bookmark
            JOIN book_locale
                ON bookmark.book_locale_id = book_locale.id
            WHERE user_id = $1
        `

        const values = [id]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows
        
    }
}

export { BookmarksModels }