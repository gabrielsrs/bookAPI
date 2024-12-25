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

        return queryResponse.rows[0]
        
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

        return queryResponse.rows[0]
        
    }

    async createBookmarkModel({ items: {
        id: bookmarkId,
        userId,
        bookId,
        privacy
    }, bookLocale: {
        id: bookLocaleId,
        page,
        paragraph_number,
        chapter_number,
        word_offset,
        location_identifier
    } }) {
        const client = await pool.connect()

        try {
            client.query('BEGIN')
    
            const bookmarkQuery = `
                INSERT INTO bookmark (id, book_id, user_id, book_locale_id, privacy)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id
            `
    
            const bookmarkValues = [bookmarkId, bookId, userId, bookLocaleId, privacy]
    
            const bookmarkQueryResponse = await client.query(bookmarkQuery, bookmarkValues)
    
            const bookLocaleQuery = `
                INSERT INTO book_locale (id, page, paragraph_number, chapter_number, word_offset, location_indentifier)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING id
            `
    
            const bookLocaleValues = [bookLocaleId, page, paragraph_number, chapter_number, word_offset, location_identifier]
    
            const bookLocaleResponse = await client.query(bookLocaleQuery, bookLocaleValues)
    
            await client.query('COMMIT')
    
            return bookmarkQueryResponse.rows[0]
    
        } catch (err) {
            client.query('ROLLBACK')
    
        } finally {
            client.release()
        }
    }

    async deleteBookmarkModel({ bookmarkId }) {
        const client = await pool.connect()

    try {
        client.query('BEGIN')

        const bookmarkQuery = `
            DELETE FROM bookmark
            WHERE id = $1
            RETURNING id
        `

        const bookmarkValues = [bookmarkId]

        const bookmarkQueryResponse = await client.query(bookmarkQuery, bookmarkValues)

        const bookLocaleQuery = `
            WITH book_locale_id AS (
                SELECT book_locale_id FROM bookmark WHERE id = $1
            )
            DELETE FROM book_locale
            WHERE id = book_locale_id
            RETURNING id
        `

        const bookLocaleValues = [bookmarkId]

        const bookLocaleResponse = await client.query(bookLocaleQuery, bookLocaleValues)

        await client.query('COMMIT')

        return bookmarkQueryResponse.rows[0]

    } catch (err) {
        client.query('ROLLBACK')

    } finally {
        client.release()
    }
    }
}

export { BookmarksModels }