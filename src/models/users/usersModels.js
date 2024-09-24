import { pool } from "../../db/index.js"

class UsersModels {
    async getUserModel ({id}) {
        const query =`
            WITH following AS (
            SELECT COUNT(*) AS following_count
            FROM follows
            WHERE follows.following_id = $1
            ), 
            follower AS (
                SELECT COUNT(*) AS follower_count
                FROM follows
                WHERE follows.followed_id = $1
            )
            SELECT users.*, 
                (SELECT following_count::INTEGER FROM following) AS following, 
                (SELECT follower_count::INTEGER FROM follower) AS followers
            FROM users
            WHERE users.id = $1
        `

        const values = [id]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows[0]
    }

    async getUsersModel () {
        const query =`
            SELECT * 
            FROM users
        `

        const queryResponse = await pool.query(query)

        return queryResponse.rows
    }
}

export { UsersModels }