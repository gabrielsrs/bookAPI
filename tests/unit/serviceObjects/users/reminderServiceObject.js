class ReminderServiceObject {
    getRemindersModel({ userId, }) {
        return {
            reminders: [],
            userId
        }
    }

    createReminderModel({ userId, items }) {
        return { userId, items }
    }

    updateReminderModel({ reminderId, items }) {
        return { reminderId, items }
    }

    deleteReminderModel({ reminderId }) {
        return { reminderId }
    }
}

export { ReminderServiceObject }