import { pool } from "../../db/index.js"

class RemindersModels {
    async getRemindersModel({id}) {
        const query = `
            SELECT 
                reminders.*,
                user_reminder.user_id
            FROM reminders
            JOIN user_reminder
	            ON reminders.id = user_reminder.remind_id
            WHERE user_reminder.user_id = $1
        `

        const values = [id]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows
    }
}

export { RemindersModels }