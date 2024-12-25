import { pool } from "../../db/index.js"

class FollowsModels {
    async getFollowsModel ({id}) {
        const client = await pool.connect()

        try{
            client.query('BEGIN')
            
            const followingQuery = `
                SELECT * 
                FROM users
                JOIN follows
                    ON users.id = follows.followed_id
                WHERE follows.following_id = $1
            `
    
            const followingValues = [id]
    
            const followingQueryResponse = await pool.query(followingQuery, followingValues)
    
            const followerQuery = `
                SELECT * 
                FROM users
                JOIN follows
                    ON users.id = follows.following_id
                WHERE follows.followed_id = $1
            `
    
            const followerValues = [id]
    
            const followerQueryResponse = await pool.query(followerQuery, followerValues)
    
            await client.query('COMMIT')

            return {
                followings: followingQueryResponse.rows[0],
                followers: followerQueryResponse.rows[0]

            }

        } catch (err) {
            client.query('ROLLBACK')
        } finally {
            client.release()
        }
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