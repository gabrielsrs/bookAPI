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
}

export { ListsModels }
