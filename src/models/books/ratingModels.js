import { pool } from "../../db/index.js"

class RatingModels {
    async getRatingsModel ({ bookId }) {
        const query = `
            SELECT ratings.*, book_rate.book_id 
            FROM ratings
            JOIN book_rate
                ON ratings.id = book_rate.rate_id
            WHERE book_rate.book_id = $1
        `
        const values = [bookId]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows
    }

    async createRatingsModel({
        rateId,
        bookId,
        userId,
        rating,
        privacy
    }) {
        const client = await pool.connect()
        try {
            client.query("BEGIN")

            const rateQuery = `
                INSERT INTO ratings (id, rating, privacy)
                VALUES ($1, $2, $3)
                RETURNING *
            `
            const rateValues = [rateId, rating, privacy]

            const rateQueryResponse = await client.query(rateQuery, rateValues)

            const bookRateQuery = `
                INSERT INTO book_rate (rate_id, book_id, user_id)
                VALUES ($1, $2, $3)
                RETURNING *
            `

            const bookRateValues = [rateId, bookId, userId]

            const bookRateQueryResponse = await client.query(bookRateQuery, bookRateValues)

            await client.query("COMMIT")

            return rateQueryResponse.rows[0]
        }
        catch (err) {
            client.query("ROLLBACK")
        }
        finally{
            client.release()
        }
    }

    async updateRatingsModel({
        ratingId,
        rateData
    }) {
        const query = `
            UPDATE ratings
                SET ${Object.keys(rateData).map(item => `${item} = ${rateData[item]}`)}
            WHERE id = $1
            RETURNING *
        `

        const values = [ratingId]

        const queryResponse = await pool.query(query, values)

        return {
            updatedRate: queryResponse
        }
    }

    async deleteRatingsModel({ratingId}) {
        const client = await pool.connect()

        try {
            client.query('BEING')

            const rateQuery = `
                DELETE FROM ratings
                WHERE id = $id
                RETURNING id
            `

            const rateValues = [ratingId]

            const rateQueryResponse = await client.query(rateQuery, rateValues)

            const bookRateQuery = `
                DELETE FROM book_rate
                WHERE rate_id = $1
                RETURNING rate_id
            `

            const bookValues = [ratingId]

            const bookRateQueryResponse = await client.query(bookRateQuery, bookValues)

            await client.query('COMMIT')

            return {
                deletedRate: rateQueryResponse.rows[0]
            }
        }
        catch(err) {
            client.query('ROLLBACK')
        }
        finally {
            client.release()
        }
    }
}

export { RatingModels }