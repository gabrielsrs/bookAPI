import { pool } from "../../db/index.js"

class QuotesModels {
    async getBookQuotesModel({id, bookId}) {
        const query = `
            SELECT * 
            FROM quotes
            JOIN book_quote
                ON quotes.id = book_quote.quote_id
            WHERE book_quote.user_id = $1 AND book_quote.book_id = $2
        `

        const values = [id, bookId]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows
        
    }

    async getBooksQuotesModel({id}) {
        const query = `
            SELECT * 
            FROM quotes
            JOIN book_quote
                ON quotes.id = book_quote.quote_id
            WHERE book_quote.user_id = $1
        `

        const values = [id]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows
        
    }
}

export { QuotesModels }