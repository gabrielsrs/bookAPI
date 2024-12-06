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

    async createExcerptModel({ id, bookId, items: {
        id: excerptId,
        content,
        privacy,
    }, bookLocale: {
        id: bookLocaleId,
        page,
        paragraph_number,
        chapter_number,
        word_offset,
        location_indentifier
    } }) {
        const client = await pool.connect()

        try {
            client.query('BEGIN')

            const excerptQuery = `
                INSERT INTO excerpts (id, content, privacy)
                VALUES ($1, $2, $3)
                RETURNING id
            `

            const excerptValues = [excerptId, content, privacy]

            const excerptQueryResponse = await client.query(excerptQuery, excerptValues)

            const bookLocaleQuery = `
                INSERT INTO book_locale (id, page, paragraph_number, chapter_number, word_offset, location_indentifier)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING id
            `

            const bookLocaleValues = [bookLocaleId, page, paragraph_number, chapter_number, word_offset, location_indentifier]

            const bookLocaleResponse = await client.query(bookLocaleQuery, bookLocaleValues)

            const bookExcerptQuery = `
                INSERT INTO book_excerpt (excerpt_id, book_id, user_id, book_locale_id)
                VALUES ($1, $2, $3, $4)
                RETURNING excerpt_id
            `

            const bookExcerptValues = [excerptId, bookId, id, bookLocaleId]

            const bookExcerptResponse = await client.query(bookExcerptQuery, bookExcerptValues)

            await client.query('COMMIT')

            return excerptQueryResponse.rows[0]

        } catch (err) {
            client.query('ROLLBACK')

        } finally {
            client.release()
        }
    }

    async updateExcerptModel({ excerptId, items, bookLocale }) {
        const client = await pool.connect()

        try {
            client.query('BEGIN')

            if (items) {
                const excerptQuery = `
                    UPDATE excerpts
                    ${Object.entries(items).map(item => `${item[0]} = ${item[1]}`)}
                    WHERE id = $1
                    RETURNING id
                `

                const excerptValues = [excerptId]

                const excerptQueryResponse = await client.query(excerptQuery, excerptValues)
            }

            const bookLocaleQuery = `
                WITH book_locale_id AS (
                    SELECT book_locale_id FROM book_excerpt WHERE excerpt_id = $1
                )
                UPDATE book_locale
                ${Object.entries(bookLocale).map(item => `${item[0]} = ${item[1]}`)}
                WHERE id = book_locale_id
                RETURNING id
            `

            const bookLocaleValues = [excerptId]

            const bookLocaleResponse = await client.query(bookLocaleQuery, bookLocaleValues)

            await client.query('COMMIT')

            return excerptId

        } catch (err) {
            client.query('ROLLBACK')

        } finally {
            client.release()
        }
    }

    async deleteExcerptModel({ excerptId }) {
        const client = await pool.connect()

        try {
            client.query('BEGIN')

            const excerptQuery = `
                DELETE FROM excerpts
                WHERE id = $1
                RETURNING id
            `

            const excerptValues = [excerptId]

            const excerptQueryResponse = await client.query(excerptQuery, excerptValues)

            const bookLocaleQuery = `
                WITH book_locale_id AS (
                    SELECT book_locale_id FROM book_excerpt WHERE excerpt_id = $1
                )
                DELETE FROM book_locale
                WHERE id = book_locale_id
                RETURNING id
            `

            const bookLocaleValues = [excerptId]

            const bookLocaleResponse = await client.query(bookLocaleQuery, bookLocaleValues)

            const bookExcerptQuery = `
                DELETE FROM book_excerpt
                WHERE excerpt_id = $1
                RETURNING excerpt_id 
            `

            const bookExcerptValues = [excerptId]

            const bookExcerptResponse = await client.query(bookExcerptQuery, bookExcerptValues)

            await client.query('COMMIT')

            return excerptQueryResponse.rows[0]

        } catch (err) {
            client.query('ROLLBACK')

        } finally {
            client.release()
        }
    }
}

export { ExcerptsModels }