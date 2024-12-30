import { pool } from "../../db/index.js"

class UsersModels {
    async getUserModel ({ userId }) {
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

        const values = [userId]

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

    async createUserModel ({
        userId, 
        nickname,
        description,
        coverImage,
        updatedAt
    }) {
        const query = `
            INSERT INTO users (id, nickname, cover_image, description, updated_at)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `

        const values = [
            userId, 
            nickname,
            description,
            coverImage,
            updatedAt
        ]

        const userQueryResponse = await pool.query(query, values)

        return userQueryResponse.rows[0]
    }

    async updateUserModel ({ userId, items }) {
        const query = `
            UPDATE users
            SET ${Object.entries(items).map(item => `${item[0]} = ${item[1]}`)}
            WHERE id = $1
            RETURNING *
        `

        const values = [userId]

        const userQueryResponse = await pool.query(query, values) 

        return userQueryResponse.rows[0]
    }

    async deleteUserModel({ userId }) {
        const query = `
            DELETE FROM users
            WHERE id = $1
            RETURNING id
        `

        const values = [userId]

        const userQueryResponse = await pool.query(query, values)

        return userQueryResponse.rows[0]
    }
}

export { UsersModels }