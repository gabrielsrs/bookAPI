import { pool } from "../../db/index.js"

class QuotesModels {
    async getBookQuotesModel({ userId, bookId }) {
        const query = `
            SELECT * 
            FROM quotes
            JOIN book_quote
                ON quotes.id = book_quote.quote_id
            WHERE book_quote.user_id = $1 AND book_quote.book_id = $2
        `

        const values = [userId, bookId]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows
        
    }

    async getBooksQuotesModel({ userId }) {
        const query = `
            SELECT * 
            FROM quotes
            JOIN book_quote
                ON quotes.id = book_quote.quote_id
            WHERE book_quote.user_id = $1
        `

        const values = [userId]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows
        
    }

  async createQuoteModel({ userId, bookId, items: {
        quoteId,
        content,
        privacy,
    }, bookLocale: {
        bookLocaleId,
        page,
        paragraph_number,
        chapter_number,
        word_offset,
        location_identifier
    } }) {
    const client = await pool.connect()

    try {
        client.query('BEGIN')

        const quoteQuery = `
            INSERT INTO quotes (id, content, privacy)
            VALUES ($1, $2, $3)
            RETURNING id
        `

        const quoteValues = [quoteId, content, privacy]

        const quoteQueryResponse = await client.query(quoteQuery, quoteValues)

        const bookLocaleQuery = `
            INSERT INTO book_locale (id, page, paragraph_number, chapter_number, word_offset, location_identifier)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `

        const bookLocaleValues = [bookLocaleId, page, paragraph_number, chapter_number, word_offset, location_identifier]

        const bookLocaleResponse = await client.query(bookLocaleQuery, bookLocaleValues)

        const bookQuoteQuery = `
            INSERT INTO book_quote (quote_id, book_id, user_id, book_locale_id)
            VALUES ($1, $2, $3, $4)
            RETURNING quote_id
        `

        const bookQuoteValues = [quoteId, bookId, userId, bookLocaleId]

        const bookQuoteResponse = await client.query(bookQuoteQuery, bookQuoteValues)

        await client.query('COMMIT')

        return quoteQueryResponse.rows[0]

    } catch (err) {
        client.query('ROLLBACK')

    } finally {
        client.release()
    }
  }

  async updateQuoteModel({ quoteId, items, bookLocale }) {
    const client = await pool.connect()

    try {
        client.query('BEGIN')

        const quoteQuery = `
            UPDATE quotes
            SET ${Object.entries(items).map(item => `${item[0]} = ${item[1]}`)}
            WHERE id = $1
            RETURNING id
        `

        const quoteValues = [quoteId]

        const quoteQueryResponse = await client.query(quoteQuery, quoteValues)

        if (Object.key(bookLocale).length) {
            const bookLocaleQuery = `
                WITH book_locale_id AS (
                    SELECT book_locale_id FROM book_quote WHERE quote_id = $1
                )
                UPDATE book_locale
                SET ${Object.entries(bookLocale).map(item => `${item[0]} = ${item[1]}`)}
                WHERE id = book_locale_id
                RETURNING id
            `

            const bookLocaleValues = [quoteId]

            const bookLocaleResponse = await client.query(bookLocaleQuery, bookLocaleValues)
        }

        await client.query('COMMIT')

        return quoteQueryResponse.rows[0]

    } catch (err) {
        client.query('ROLLBACK')

    } finally {
        client.release()
    }
  }

  async deleteQuoteModel({ quoteId }) {
    const client = await pool.connect()

    try {
        client.query('BEGIN')

        const quoteQuery = `
            DELETE FROM quotes
            WHERE id = $1
            RETURNING id
        `

        const quoteValues = [quoteId]

        const quoteQueryResponse = await client.query(quoteQuery, quoteValues)

        const bookLocaleQuery = `
            WITH book_locale_id AS (
                SELECT book_locale_id FROM book_quote WHERE quote_id = $1
            )
            DELETE FROM book_locale
            WHERE id = book_locale_id
            RETURNING id
        `

        const bookLocaleValues = [quoteId]

        const bookLocaleResponse = await client.query(bookLocaleQuery, bookLocaleValues)

        const bookQuoteQuery = `
            DELETE FROM book_quote
            WHERE quote_id = $1
            RETURNING quote_id 
        `

        const bookQuoteValues = [quoteId]

        const bookQuoteResponse = await client.query(bookQuoteQuery, bookQuoteValues)

        await client.query('COMMIT')

        return quoteQueryResponse.rows[0]

    } catch (err) {
        client.query('ROLLBACK')

    } finally {
        client.release()
    }
  }

}

export { QuotesModels }