import { pool } from "../../db/index.js"

class ListsModels {
    async getListModel({id, listId}) {
        const query = `
            WITH likes AS (
                SELECT COUNT(*) AS likes_count
                FROM likes_list
                WHERE list_id = $2
            ),
            followers AS (
                SELECT COUNT(*) AS followers_count
                FROM list_followed
                WHERE list_id = $2
            )
            SELECT 
                lists.id, 
                lists.name, 
                lists.description,
                lists.privacy,  
                lists.updated_at, 
                user_lists.user_id, 
                (SELECT likes_count::INTEGER FROM likes) AS likes, 
                (SELECT followers_count::INTEGER FROM followers) AS followers,
                COUNT(books)::INTEGER AS books_count,
                JSON_AGG(row_to_json(books)) AS books
            FROM lists 
            JOIN user_lists
                ON lists.id = user_lists.list_id
            JOIN list_books 
                ON lists.id = list_books.list_id
            JOIN books
                ON list_books.book_id = books.id
            GROUP BY 
                lists.id, 
                lists.name, 
                lists.description,
                lists.privacy,  
                lists.updated_at, 
                user_lists.user_id
            HAVING user_lists.user_id = $1 AND lists.id = $2
        `
        
        const values = [id, listId]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows[0]
    }    
    
    async getListsModel({id}) {
        const query = `
            SELECT 
                lists.id, 
                lists.name, 
                lists.description,
                lists.privacy,  
                lists.updated_at, 
                user_lists.user_id, 
                (SELECT COUNT(*)::INTEGER FROM likes_list WHERE likes_list.list_id = lists.id) AS likes,
                (SELECT COUNT(*)::INTEGER FROM list_followed WHERE list_followed.list_id = lists.id) AS followers,
                COUNT(books)::INTEGER AS books_count,
                JSON_AGG(row_to_json(books)) AS books
            FROM lists 
            JOIN user_lists
                ON lists.id = user_lists.list_id
            JOIN list_books 
                ON lists.id = list_books.list_id
            JOIN books
                ON list_books.book_id = books.id
            GROUP BY 
                lists.id, 
                lists.name, 
                lists.description,
                lists.privacy,  
                lists.updated_at, 
                user_lists.user_id
            HAVING user_lists.user_id = $1
        `

        const values = [id]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows
    }

    async createListModel({ userId, items: {
        id: listId,
        name,
        description,
        privacy,
        updatedAt
    } }) {
        const client = pool.connect()

        try {
            client.query('BEGIN')

            const listQuery = `
                INSERT INTO lists (id, name, description, privacy, updated_at)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id
            `
            
            const listValues = [listId, name, description, privacy, updatedAt]

            const listQueryResponse = await pool.query(listQuery, listValues)
            
            const userListQuery = `
                INSERT INTO user_lists (user_id, list_id)
                VALUES ($1, $2)
                RETURNING id
            `
            
            const userListValues = [userId, listId]

            const userListQueryResponse = await pool.query(userListQuery, userListValues)
            
            await client.query('COMMIT')

            return listQueryResponse.rows[0]

        } catch (err) {
            client.query('ROLLBACK')
        } finally {
            client.release()
        }
    }

    async updateListModel({ listId, items }) {
        const query = `
            UPDATE lists
            SET ${Object.entries(items).map(item => `${item[0]} = ${item[1]}`)}
            WHERE id = $1
            RETURNING id
        `
        
        const values = [listId]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows[0]
    }

    async deleteListModel({ listId }) {
        const client = pool.connect()

        try {
            client.query('BEGIN')

            const listQuery = `
                DELETE FROM lists
                WHERE id = $1
                RETURNING id
            `
            
            const listValues = [listId]

            const listQueryResponse = await pool.query(listQuery, listValues)
            
            const userListQuery = `
                DELETE FROM user_lists
                WHERE list_id = $1
                RETURNING id
            `
            
            const userListValues = [listId]

            const userListQueryResponse = await pool.query(userListQuery, userListValues)
            
            await client.query('COMMIT')

            return listQueryResponse.rows[0]

        } catch (err) {
            client.query('ROLLBACK')
        } finally {
            client.release()
        }
    }

    async addBookToListModel({ listId, bookId }) {
        const query = `
            INSERT INTO list_books (list_id, book_id)
            VALUES ($1, $2)
            RETURNING *
        `
        
        const values = [listId, bookId]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows[0]
    }
    
    async removeBookFromListModel({ listId, bookId }) {
        const query = `
            DELETE FROM list_books
            WHERE list_id = $1 AND book_id = $2
            RETURNING *
        `
        
        const values = [listId, bookId]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows[0]
    }

    async getLikedListModel({id, listId}) {
        const query = `
            SELECT 
                lists.id, 
                lists.name, 
                lists.description,
                lists.privacy,  
                lists.updated_at,
                JSON_AGG(users) AS users_likes
            FROM lists
            JOIN likes_list
                ON lists.id = likes_list.list_id
            JOIN user_lists
                ON lists.id = user_lists.list_id
            JOIN users
                ON users.id = likes_list.user_id
            GROUP BY 
                lists.id, 
                lists.name, 
                lists.description,
                lists.privacy,  
                lists.updated_at,
                user_lists.user_id,
                user_lists.list_id
            HAVING user_lists.user_id = $1 AND user_lists.list_id = $2
        `
        
        const values = [id, listId]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows[0]
    }

    async getLikedListsModel({id}) {
        const query = `
            SELECT 
                lists.id, 
                lists.name, 
                lists.description,
                lists.privacy,  
                lists.updated_at,
                JSON_AGG(users) AS users_likes
            FROM lists
            JOIN likes_list
                ON lists.id = likes_list.list_id
            JOIN user_lists
                ON lists.id = user_lists.list_id
            JOIN users
                ON users.id = likes_list.user_id
            GROUP BY 
                lists.id, 
                lists.name, 
                lists.description,
                lists.privacy,  
                lists.updated_at,
                user_lists.user_id,
                user_lists.list_id
            HAVING user_lists.user_id = $1
        `

        const values = [id]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows
    }

    async likeListModel({ userId, listId }) {
        const query = `
            INSERT INTO likes_list (user_id, list_id)
            VALUES ($1, $2)
            RETURNING *
        `
        
        const values = [userId, listId]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows[0]
    }

    async unlikeListModel({ userId, listId }){
        const query = `
            DELETE FROM likes_list
            WHERE user_id = $1 AND list_id = $2
            RETURNING *
        `
        
        const values = [userId, listId]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows[0]
    }

    async getFollowedListModel({id, listId}) {
        const query = `
            SELECT 
                lists.id, 
                lists.name, 
                lists.description,
                lists.privacy,  
                lists.updated_at,
                JSON_AGG(users) AS users_followers
            FROM lists
            JOIN list_followed
                ON lists.id = list_followed.list_id
            JOIN user_lists
                ON lists.id = user_lists.list_id
            JOIN users
                ON users.id = list_followed.user_id
            GROUP BY 
                lists.id, 
                lists.name, 
                lists.description,
                lists.privacy,  
                lists.updated_at,
                user_lists.user_id,
                user_lists.list_id
            HAVING user_lists.user_id = $1 AND user_lists.list_id = $2
        `

        const values = [id, listId]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows[0]
    }   

    async getFollowedListsModel({id}) {
        const query = `
            SELECT 
                lists.id, 
                lists.name, 
                lists.description,
                lists.privacy,  
                lists.updated_at,
                JSON_AGG(users) AS users_followers
            FROM lists
            JOIN list_followed
                ON lists.id = list_followed.list_id
            JOIN user_lists
                ON lists.id = user_lists.list_id
            JOIN users
                ON users.id = list_followed.user_id
            GROUP BY 
                lists.id, 
                lists.name, 
                lists.description,
                lists.privacy,  
                lists.updated_at,
                user_lists.user_id,
                user_lists.list_id
            HAVING user_lists.user_id = $1
        `

        const values = [id]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows
    }

    async followListModel({ userId, listId }) {
        const query = `
            INSERT INTO list_followed (user_id, list_id)
            VALUES ($1, $2)
            RETURNING *
        `
        
        const values = [userId, listId]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows[0]
    }

    async unfollowListModel({ userId, listId }) {
        const query = `
            DELETE FROM list_followed
            WHERE user_id = $1 AND list_id = $2
            RETURNING *
        `
        
        const values = [userId, listId]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows[0]        
    }
}

export { ListsModels }
