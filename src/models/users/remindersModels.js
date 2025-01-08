import { pool } from "../../db/index.js"

class RemindersModels {
    async getRemindersModel({ userId }) {
        const query = `
            SELECT 
                reminders.*,
                user_reminder.user_id
            FROM reminders
            JOIN user_reminder
	            ON reminders.id = user_reminder.remind_id
            WHERE user_reminder.user_id = $1
        `

        const values = [userId]

        const queryResponse = await pool.query(query, values)

        return {
            reminder: queryResponse.rows
        }
    }
    
    async createReminderModel({
        userId, 
        items: {
            reminderId,
            name,
            description,
            reminderDate,
            reminderTime,
            is_active: isActive,
            is_sent: isSent,
        }
    }) {
        const client = await pool.connect()

        try {
            client.query('BEGIN')

            const reminderQuery = `
                INSERT INTO reminders (id, name, description, reminderDate, reminder_time, is_active, is_sent)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING id
            `

            const reminderValues = [id, name, description, reminderDate, reminderTime, isActive, isSent]

            const reminderResponse = await client.query(reminderQuery, reminderValues)

            const userReminderQuery = `
                INSERT INTO user_reminder (user_id, remind_id)
                VALUES ($1, $2)
                RETURNING id
            `

            const userReminderValues = [userId, reminderId]

            await client.query(userReminderQuery, userReminderValues)

            await client.query('COMMIT')

            return {
                reminder: reminderResponse.rows[0]
            }

        } catch (e) {
            await client.query('ROLLBACK')
        } finally {
            client.release()
        }
    }
    async updateReminderModel({ reminderId, items }) {
        const query = `
            UPDATE reminders
            SET ${Object.entries(items).map(item => `${item[0]} = ${item[1]}`)}
            WHERE id = $1
            RETURNING id
        `

        const values = [reminderId]

        const queryResponse = await client.query(query, values)

        return {
            reminder: queryResponse.rows[0]
        }

    }
    async deleteReminderModel({ reminderId }) {
        const query = `
            DELETE FROM reminders
            WHERE id = $1
            RETURNING id
        `

        const values = [reminderId]

        const queryResponse = await pool.query(query, values)
        
        return {
            reminder: queryResponse.rows[0]
        }
    }

}

export { RemindersModels }