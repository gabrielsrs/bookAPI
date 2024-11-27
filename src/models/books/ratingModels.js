import { pool } from "../../db/index.js"

class RatingModels {
    async getRatingsModel ({id}) {
        const query = `
            SELECT ratings.*, book_rate.book_id 
            FROM ratings
            JOIN book_rate
                ON ratings.id = book_rate.rate_id
            WHERE book_rate.book_id = $1
        `
        const values = [id]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows
    }

    async createRatingsModel({
        rate_id,
        id,
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
            `
            const rateValues = [rate_id, rating, privacy]

            const rateQueryResponse = await client.query(rateQuery, rateValues)

            const bookRateQuery = `
                INSERT INTO book_rate (rate_id, book_id, user_id)
                VALUES ($1, $2, $3)
            `

            const bookRateValues = [rate_id, id, userId]

            const bookRateQueryResponse = await client.query(bookRateQuery, bookRateValues)

            await client.query("COMMIT")

            return {
                rate: rateQueryResponse
            }
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
                ${Object.keys(rateData).map(item => `SET ${item} = ${rateData[item]}`)}
            WHERE id = $1
        `

        const values = [ratingId]

        const queryResponse = await pool.query(query, values)

        return {
            updatedRate: queryResponse
        }
    }

    async deleteRatingsModel({ratingId}) {
        const client = pool.connect()

        try {
            client.query('BEING')

            const rateQuery = `
                DELETE FROM ratings
                WHERE id = $id
                RETURNING *
            `

            const rateValues = [ratingId]

            const rateQueryResponse = client.query(rateQuery, rateValues)

            const bookRateQuery = `
                DELETE FROM book_rate
                WHERE rate_id = $1
            `

            const bookValues = [ratingId]

            const bookRateQueryResponse = client.query(bookRateQuery, bookValues)

            client.query('COMMIT')

            return {
                deletedRate: rateQueryResponse
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