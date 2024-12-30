import { pool } from "../../db/index.js"

class ReadingModels {
    async getReadingProgressModel({userId, bookId}) {
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
                book_locale.location_identifier,
                reading_progress.user_id,
                reading_progress.book_id
            FROM reading_progress
            JOIN book_locale
                ON reading_progress.book_locale_id = book_locale.id
            WHERE reading_progress.user_id = $1 AND reading_progress.book_id = $2
        `

        const values = [userId, bookId]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows[0]
    }

    async createReadingProgressModel({
        userId, 
        bookId, 
        items: {
            readingProgressId,
            privacy,
            lastReading,
            started,
            finished            
        }, 
        bookLocale: {
            bookLocaleId,
            page,
            paragraph_number,
            chapter_number,
            word_offset,
            location_identifier
        }
    }) {
        const client = await pool.connect()

        try {
            client.query('BEGIN')

            const readingProgressQuery = `
                INSET INTO reading_progress (id, book_id, user_id, book_locale_id, privacy, last_reading, started, finished)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING id
            `

            const readingProgressValues = [readingProgressId, bookId, userId, bookLocaleId, privacy, lastReading, started, finished]

            const readingProgressQueryResponse = await client.query(readingProgressQuery, readingProgressValues)

            const bookLocaleQuery = `
                INSERT INTO book_locale (id, page, paragraph_number, chapter_number, word_offset, location_identifier)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING id
            `

            const bookLocaleValues = [bookLocaleId, page, paragraph_number, chapter_number, word_offset, location_identifier]

            const bookLocaleResponse = await client.query(bookLocaleQuery, bookLocaleValues)

            await client.query('COMMIT')

            return readingProgressQueryResponse.rows[0]

        } catch (err) {
            client.query('ROLLBACK')

        } finally {
            client.release()
        }
    }

    async updateReadingProgressModel({ progressId, items, bookLocale }) {
        const client = await pool.connect()

        try {
            client.query('BEGIN')

            const readingProgressQuery = `
                UPDATE reading_progress
                SET ${Object.entries(items).map(item => `${item[0]} = ${item[1]}`)}
                WHERE id = $1
                RETURNING id
            `

            const readingProgressValues = [progressId]

            const readingProgressQueryResponse = await client.query(readingProgressQuery, readingProgressValues)

            if(Object.key(bookLocale).length) {
                const bookLocaleQuery = `
                    WITH book_locale_id AS (
                        SELECT book_locale_id FROM reading_progress WHERE id = $1
                    )
                    UPDATE book_locale
                    SET ${Object.entries(bookLocale).map(item => `${item[0]} = ${item[1]}`)}
                    WHERE id = book_locale_id
                    RETURNING id
                `

                const bookLocaleValues = [progressId]

                const bookLocaleResponse = await client.query(bookLocaleQuery, bookLocaleValues)
            }

            await client.query('COMMIT')

            return readingProgressQueryResponse.rows[0]

        } catch (err) {
            client.query('ROLLBACK')

        } finally {
            client.release()
        }
    }
    
    async getReadingGoalsModel({ userId, bookId }) {
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

        const values = [userId, bookId]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows
    }

    async createReadingGoalModel({
        userId, 
        bookId, 
        items: {
            goalId,
            name,
            description,
            duration,
            startTime,
            endDate,
            goalUpdatedAt
        }, 
        frequency: {
            frequencyId,
            option,
            marker
        }, 
        reminder: {
            reminderId,
            reminderDate = undefined,
            reminderTime,
            isActive,
            isSent,
            reminderUpdatedAt
        } }) {
            const client = await pool.connect()

            try {
                client.query('BEGIN')

                const goalQuery = `
                    INSERT INTO goals (id, name, description, duration, start_time, end_date, updated_at)
                    VALUES ($1, $2, $3, INTERVAL $4, $5, $6, $7)
                    RETURNING id
                `

                const goalValues = [goalId, name, description, duration, startTime, endDate, goalUpdatedAt]

                const goalQueryResponse = await client.query(goalQuery, goalValues)

                const frequencyQuery = `
                    INSERT INTO frequencies (id, option, marker)
                    VALUES ($1, $2, $3)
                    RETURNING id
                `

                const frequencyValues = [frequencyId, option, marker]

                const frequencyQueryResponse = await client.query(frequencyQuery, frequencyValues)

                const frequencyGoalQuery = `
                    INSERT INTO frequency_goal (frequency_id, goal_id)
                    VALUES ($1, $2)
                    RETURNING goal_id
                `

                const frequencyGoalValues = [frequencyId, goalId]

                const frequencyGoalQueryResponse = await client.query(frequencyGoalQuery, frequencyGoalValues)

                const userGoalQuery = `
                    INSERT INTO user_goal (user_id, goal_id)
                    VALUES ($1, $2)
                    RETURNING user_id
                `

                const userGoalValues = [userId, goalId]

                const userGoalQueryResponse = await client.query(userGoalQuery, userGoalValues)

                const goalBookQuery = `
                    INSERT INTO goal_book (book_id, goal_id)
                    VALUES ($1, $2)
                    RETURNING goal_id
                `

                const goalBookValues = [bookId, goalId]

                const goalBookQueryResponse = await client.query(goalBookQuery, goalBookValues)

                const reminderQuery = `
                    INSERT INTO reminders (id, name, description, reminder_date, reminder_time, is_active, is_sent, updated_at)
                    VALUES ($1, $2, $3, $4, $5, $6 ,$7, $8)
                    RETURNING id
                `

                const reminderValues = [reminderId, name, description, reminderDate, reminderTime, isActive, isSent, reminderUpdatedAt]

                const reminderQueryResponse = await client.query(reminderQuery, reminderValues)

                const goalReminderQuery = `
                    INSERT INTO goal_reminder (goal_id, reminder_id)
                    VALUES ($1, $2)
                    RETURNING goal_id
                `

                const goalReminderValues = [goalId, reminderId]

                const goalReminderQueryResponse = await client.query(goalReminderQuery, goalReminderValues)
                
                await client.query('COMMIT')

                return goalQueryResponse.rows[0]

            } catch (err) {
                client.query('ROLLBACK')

            } finally {
                client.release()
            }
    }

    async updateReadingGoalModel({ goalId, items, frequency, reminder }) {
        const client = await pool.connect()

        try {
            client.query('BEGIN')

            if (Object.key(items).length) {
                const goalQuery = `
                    UPDATE goals
                    SET ${Object.entries(items).map(([key, value]) => `${key} = '${value}'`)}
                    WHERE id = $1
                    RETURNING id
                `

                const goalValues = [goalId]

                const goalQueryResponse = await client.query(goalQuery, goalValues)

            }

            if (Object.key(frequency).length) {
                const frequencyQuery = `
                    WITH frequency_id AS ( SELECT frequency_id FROM frequency_goal WHERE goal_id = $1 )
                    UPDATE frequencies
                    SET ${Object.entries(frequency).map(([key, value]) => `${key} = '${value}'`)}
                    WHERE id = frequency_id
                    RETURNING id
                `

                const frequencyValues = [goalId]

                const frequencyQueryResponse = await client.query(frequencyQuery, frequencyValues)
            }

            if (Object.key(reminder).length) {
                const reminderQuery = `
                    WITH reminder_id AS ( SELECT reminder_id FROM goal_reminder WHERE goal_id = $1 )
                    UPDATE reminders
                    SET ${Object.entries(reminder).map(([key, value]) => `${key} = '${value}'`)}
                    WHERE id = reminder_id
                    RETURNING id
                `

                const reminderValues = [goalId]

                const reminderQueryResponse = await client.query(reminderQuery, reminderValues)
            }
            
            await client.query('COMMIT')

            return goalQueryResponse.rows[0]

        } catch (err) {
            client.query('ROLLBACK')

        } finally {
            client.release()
        }
    }

    async deleteReadingGoalModel({ goalId }) {
        const client = await pool.connect()

        try {
            client.query('BEGIN')

            const goalQuery = `
                DELETE FROM goals
                WHERE id = $1
                RETURNING id
            `

            const goalValues = [goalId]

            const goalQueryResponse = await client.query(goalQuery, goalValues)

            const frequencyGoalQuery = `
                DELETE FROM frequency_goal
                WHERE goal_id = $1
                RETURNING frequency_id
            `

            const frequencyGoalValues = [goalId]

            const frequencyGoalQueryResponse = await client.query(frequencyGoalQuery, frequencyGoalValues)

            const frequencyQuery = `
                WITH frequency_id AS 
                    (SELECT frequency_id FROM frequency_goal WHERE goal_id = $1)
                DELETE FROM frequencies
                WHERE id = frequency_id
                RETURNING id
            `

            const frequencyValues = [goalId]

            const frequencyQueryResponse = await client.query(frequencyQuery, frequencyValues)

            const userGoalQuery = `
                DELETE FROM user_goal
                WHERE goal_id = $1
                RETURNING user_id
            `

            const userGoalValues = [goalId]

            const userGoalQueryResponse = await client.query(userGoalQuery, userGoalValues)

            const goalBookQuery = `
                DELETE FROM goal_book
                WHERE goal_id = $1
                RETURNING book_id
            `

            const goalBookValues = [goalId]

            const goalBookQueryResponse = await client.query(goalBookQuery, goalBookValues)

            const goalReminderQuery = `
                DELETE FROM goal_reminder
                WHERE goal_id = $1
                RETURNING reminder_id
            `

            const goalReminderValues = [goalId]

            const goalReminderQueryResponse = await client.query(goalReminderQuery, goalReminderValues)

            const reminderQuery = `
                DELETE FROM reminders
                WHERE id = $1
                RETURNING id
            `

            const reminderValues = [goalReminderQueryResponse.rows[0].reminder_id]

            const reminderQueryResponse = await client.query(reminderQuery, reminderValues)

            await client.query('COMMIT')

            return goalQueryResponse.rows[0]

        } catch (err) {
            client.query('ROLLBACK')

        } finally {
            client.release()
        }
    }
    
}

export { ReadingModels }