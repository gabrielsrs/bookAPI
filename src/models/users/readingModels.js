import { pool } from "../../db/index.js"

class ReadingModels {
    async getReadingProgressModel({id, bookId}) {
        const query = `
            SELECT  
                reading_progress.id,
                reading_progress.book_locale_id,
                CASE
                    WHEN lower(page) = upper(page) - 1 THEN ARRAY[lower(page)]
                    ELSE ARRAY[lower(page), upper(page) - 1]
                END AS pages,
                CASE
                    WHEN lower(paragraph_number) = upper(paragraph_number) - 1 THEN ARRAY[lower(paragraph_number)]
                    ELSE ARRAY[lower(paragraph_number), upper(paragraph_number) - 1]
                END AS paragraph_number,
                CASE
                    WHEN lower(chapter_number) = upper(chapter_number) - 1 THEN ARRAY[lower(chapter_number)]
                    ELSE ARRAY[lower(chapter_number), upper(chapter_number) - 1]
                END AS chapter_number,
                CASE
                    WHEN lower(word_offset) = upper(word_offset) - 1 THEN ARRAY[lower(word_offset)]
                    ELSE ARRAY[lower(word_offset), upper(word_offset) - 1]
                END AS word_offset,
                book_locale.location_indentifier,
                reading_progress.user_id,
                reading_progress.book_id
            FROM reading_progress
            JOIN book_locale
                ON reading_progress.book_locale_id = book_locale.id
            WHERE reading_progress.user_id = $1 AND reading_progress.book_id = $2
        `

        const values = [id, bookId]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows[0]
    }
    
    async getReadingGoalsModel({id, bookId}) {
        const query = `
            SELECT 
                goals.*, 
                user_goal.user_id,
                goal_book.book_id,
                goal_reminder.remind_id
            FROM goals
            JOIN user_goal
                ON goals.id = user_goal.goal_id
            JOIN goal_book
                ON goals.id = goal_book.goal_id
            JOIN goal_reminder
                ON goals.id = goal_reminder.goal_id
            WHERE user_goal.user_id = $1 AND goal_book.book_id = $2
        `

        const values = [id, bookId]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows
    }
}

export { ReadingModels }