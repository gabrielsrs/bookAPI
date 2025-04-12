import { beforeEach, describe, expect, it } from "vitest"
import { RemindersServices } from "../../../src/services/users/remindersServices.js"
import { ReminderServiceObject } from "../serviceObjects/users/reminderServiceObject"

import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)

import { ulid } from "ulid"

describe("reminderService", () => {
    let reminderService
    let reminderServiceObject
    let userId, reminderId
    const checkId = /^[0-7][0-9A-HJKMNP-TV-Z]{25}$/

    beforeEach(() => {
        reminderService = new RemindersServices()
        reminderServiceObject = new ReminderServiceObject();

        [userId, reminderId] = [ulid(), ulid()]
    })

    it("get reminders from a user", async () => {
        const reminders = await reminderService.getRemindersService({ userId }, reminderServiceObject)

        expect(reminders).toBeInstanceOf(Object)

        expect(reminders.userId).toMatch(checkId)
        expect(reminders).toMatchObject({
            count: 0,
            reminders: []
        })
    })

    it.for([
        {
            items: {
                name: "Test",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                reminder_datetime: "02/12/2025 23:03",
                is_active: false,
                is_sent: true
            },
            expected: {
                name: "Test",
                description: "string",
                isActive: false,
                isSent: true
            }
        },
        {
            items: {
                name: "Test1",
                reminder_datetime: "09/30/2025 12:55"
            },
            expected: {
                name: "Test1",
                description: "undefined",
                isActive: true,
                isSent: false
            }
        }
    ])("create reminders from a user", async ({ items, expected }) => {
        const reminder = await reminderService.createReminderService({ userId, items }, reminderServiceObject)

        expect(reminder).toBeInstanceOf(Object)

        expect(reminder.userId).toMatch(checkId)

        expect(reminder.items.name).toEqual(expected.name)
        expect(reminder.items.description).toBeTypeOf(expected.description)

        expect(reminder.items.reminderDate).toSatisfy(value => dayjs(value, "YYYY-MM-DD", true).isValid())
        expect(reminder.items.reminderTime).toSatisfy(value => dayjs(value, "HH:mm:ss", true).isValid())

        expect(reminder.items.is_active).toEqual(expected.isActive)
        expect(reminder.items.is_sent).toEqual(expected.isSent)

        expect(reminder.items.updatedAt).toSatisfy(value => dayjs(value, "YYYY-MM-DD[T]HH:mm:ss", true).isValid())
    })

    it.for([
        {
            items: {
                is_active: false,
                is_sent: true
            },
            expected: {
                name: undefined,
                description: undefined,
                isActive: false,
                isSent: true,
                reminderDate: true,
                reminderTime:true
            }
        },
        {
            items: {
                reminder_datetime: "09/30/2025 12:55"
            },
            expected: {
                name: undefined,
                description: undefined,
                isActive: undefined,
                isSent: undefined,
                reminderDate: false,
                reminderTime: false
            }
        }
    ])("create reminders from a user", async ({ items, expected }) => {
        const reminder = await reminderService.updateReminderService({ reminderId, items }, reminderServiceObject)

        expect(reminder).toBeInstanceOf(Object)

        expect(reminder.reminderId).toMatch(checkId)

        expect(reminder.items.name).toEqual(expected.name)
        expect(reminder.items.description).toEqual(expected.description)

        expect(reminder.items.reminder_date).toSatisfy(value => expected.reminderDate || dayjs(value, "YYYY-MM-DD", true).isValid())
        expect(reminder.items.reminder_time).toSatisfy(value => expected.reminderTime || dayjs(value, "HH:mm:ss", true).isValid())

        expect(reminder.items.is_active).toEqual(expected.isActive)
        expect(reminder.items.is_sent).toEqual(expected.isSent)

        expect(reminder.items.updated_at).toSatisfy(value => dayjs(value, "YYYY-MM-DD[T]HH:mm:ss", true).isValid())
    })

    it("delete reminder from a user", async () => {
        const reminder = await reminderService.deleteReminderService({ reminderId }, reminderServiceObject)

        expect(reminder).toBeInstanceOf(Object)

        expect(reminder.reminderId).toMatch(checkId)
    })
})