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

    async createFollowModel({ id, follow, followed }){
        const query = `
            INSERT INTO follows (id, following_id, followed_id)
            VALUES ($1, $2, $3)
            RETURNING *
        `

        const values = [id, follow, followed]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows[0]
    }

    async deleteFollowModel({ unfollow, unfollowed }) {
        const query = `
            DELETE FROM follows
            WHERE following_id = $1 AND followed_id = $2
            RETURNING id
        `

        const values = [unfollow, unfollowed]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows[0]
    }
}

export { FollowsModels }