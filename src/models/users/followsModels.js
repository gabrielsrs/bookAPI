import { pool } from "../../db/index.js"

class FollowsModels {
    async getFollowingModel ({id}) {
        const query = `
            SELECT * 
            FROM users
            JOIN follows
                ON users.id = follows.followed_id
            WHERE follows.following_id = $1
        `

        const values = [id]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows
    }

    async getFollowerModel ({id}) {
        const query = `
            SELECT * 
            FROM users
            JOIN follows
                ON users.id = follows.following_id
            WHERE follows.followed_id = $1
        `

        const values = [id]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows
    }
}

export { FollowsModels }