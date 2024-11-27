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

    async createUserModel ({
        id, 
        nickname,
        description,
        coverImage,
        updatedAt
    }) {
        const query = `
            INSERT INTO users (id, nickname, cover_image, description, updated_at)
            VALUES ($1, $2, $3, $4, $5)
        `

        const values = [
            id, 
            nickname,
            description,
            coverImage,
            updatedAt
        ]

        const userQueryResponse = await pool.query(query, values)

        return userQueryResponse.rows[0]
    }

    async updateUserModel ({id, items}) {
        const query = `
            UPDATE users
                ${Object.entries(items).map(item => `${item[0]} = ${item[1]}`)}
            WHERE id = $1
            RETURNING *
        `

        const values = [id]

        const userQueryResponse = await pool.query(query, values) 

        return userQueryResponse.rows[0]
    }

    async deleteUserModel({id}) {
        const query = `
            DELETE FROM users
            WHERE id = $1
            RETURNING id
        `

        const values = [id]

        const userQueryResponse = await pool.query(query, values)

        return userQueryResponse.rows[0]
    }
}

export { UsersModels }