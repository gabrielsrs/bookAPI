import { beforeEach, describe, expect, it } from "vitest"
import { ReadingServices } from "../../src/services/users/readingServices.js"
import { ReadingServiceObject } from "../serviceObjects/users/readingServiceObject.js"

import dayjs from "dayjs"
import { ulid } from "ulid"

describe("readingService", () => {
    let readingServices
    let readingServiceObject
    let userId, bookId, progressId, goalId
    const checkId = /^[0-7][0-9A-HJKMNP-TV-Z]{25}$/

    beforeEach(() => {
        readingServices = new ReadingServices()
        readingServiceObject = new ReadingServiceObject();

        [userId, bookId, progressId, goalId] = [ulid(), ulid(), ulid(), ulid()]
    })

    describe("reading tests", () => {
        it("reading progress from a book of user", async () => {
            const readingProgress = await readingServices.getReadingProgressService({ userId, bookId }, readingServiceObject)

            expect(readingProgress).toBeInstanceOf(Object)

            expect(readingProgress.userId).toMatch(checkId)
            expect(readingProgress.bookId).toMatch(checkId)
        })

        it.for([
            {
                items: {
                    privacy: true,
                    started: true,
                    finished: false,
                    book_locale: {
                        page: 1,
                        paragraph_number: 2,
                        chapter_number: 3,
                        word_offset: 4
                    }
                }, expected: {
                    privacy: true,
                    started: true,
                    finished: false,
                    bookLocaleObject: {
                        page: 1,
                        paragraph_number: 2,
                        chapter_number: 3,
                        word_offset: 4
                    }
                }
            },
            {
                items: {
                    book_locale: {
                        location_identifier: {
                            local: "test"
                        }
                    }
                }, expected: {
                    privacy: false,
                    started: false,
                    finished: false,
                    bookLocaleObject: {
                        location_identifier: {
                            local: "test"
                        }
                    }
                }
            }
        ])("create reading progress", async ({ items, expected }) => {
            const readingProgress = await readingServices.createReadingProgressService({ userId, bookId, items }, readingServiceObject)

            expect(readingProgress).toBeInstanceOf(Object)
            expect(readingProgress.items).toBeInstanceOf(Object)
            expect(readingProgress.bookLocale).toBeInstanceOf(Object)

            expect(readingProgress.items.readingProgressId).toMatch(checkId)
            expect(readingProgress.bookLocale.bookLocaleId).toMatch(checkId)
            expect(readingProgress.userId).toMatch(checkId)
            expect(readingProgress.bookId).toMatch(checkId)

            expect(readingProgress.items.privacy).toEqual(expected.privacy)
            expect(readingProgress.items.started).toEqual(expected.started)
            expect(readingProgress.items.finished).toEqual(expected.finished)

            expect(readingProgress.bookLocale).toMatchObject(expected.bookLocaleObject)

            expect(readingProgress.items.lastReading).toBeTruthy()
        })

        it.for([
            {
                items: {
                    book_locale: {
                        page: 4,
                        paragraph_number: 3,
                        chapter_number: 2,
                        word_offset: 1
                    }
                },
                expected: {
                    bookLocale: "object",
                    privacy: undefined,
                    started: undefined,
                    finished: undefined,
                    lastReading: "string",
                }
            },
            {
                items: {
                    privacy: true,
                    started: true,
                    finished: false,
                },
                expected: {
                    bookLocale: "undefined",
                    privacy: true,
                    started: true,
                    finished: false,
                    lastReading: "undefined",
                }
            }
        ])("update reading progress info", async ({ items, expected }) => {
            const readingProgress = await readingServices.updateReadingProgressService({ progressId, items }, readingServiceObject)

            expect(readingProgress).toBeInstanceOf(Object)
            expect(readingProgress.items).toBeInstanceOf(Object)

            expect(readingProgress.bookLocale).toBeTypeOf(expected.bookLocale)
            expect(readingProgress.items.last_reading).toBeTypeOf(expected.lastReading)

            expect(readingProgress.progressId).toMatch(checkId)

            expect(readingProgress.items.privacy).toEqual(expected.privacy)
            expect(readingProgress.items.started).toEqual(expected.started)
            expect(readingProgress.items.finished).toEqual(expected.finished)

            expect(readingProgress.items.book_locale).toBeFalsy()
        })

    })

    describe("goal crud", () => {
        it("get goals from a user", async () => {
            const goals = await readingServices.getReadingGoalsService({ userId, bookId }, readingServiceObject)

            expect(goals).toBeInstanceOf(Object)

            expect(goals.userId).toMatch(checkId)
            expect(goals.bookId).toMatch(checkId)
            expect(goals).toMatchObject({
                count: 0,
                goals: []
            })
        })

        it.for([
            {
                items: {
                    name: "Test",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices.",
                    duration: 30,
                    start_time: "12:00",
                    end_date: "09/30/2025",
                    frequency: {
                        option: "Weekly",
                        marker: ["Mon", "Wen", "Fri"]
                    }
                },
                expected: {
                    description: "string",
                    duration: 30,
                    startTime: "12:00",
                    endDate: "09/30/2025",
                    option: "Weekly",
                    marker: ["Mon", "Wen", "Fri"],
                }
            }, 
            {
                items: {
                    name: "Test1",
                    duration: 60,
                    start_time: "17:00",
                    end_date: "02/02/2025",
                    frequency: {
                        option: "once",
                    }
                },
                expected: {
                    description: "undefined",
                    duration: 60,
                    startTime: "17:00",
                    endDate: "02/02/2025",
                    option: "once",
                    marker: [],
                    
                }
            }
        ])("create goal from a user", async ({ items, expected }) => {
            const goal = await readingServices.createReadingGoalService({ userId, bookId, items }, readingServiceObject)
            
            expect(goal).toBeInstanceOf(Object)
            expect(goal.frequency).toBeInstanceOf(Object)
            expect(goal.reminder).toBeInstanceOf(Object)

            expect(goal.userId).toMatch(checkId)
            expect(goal.bookId).toMatch(checkId)
            expect(goal.items.goalId).toMatch(checkId)
            expect(goal.frequency.frequencyId).toMatch(checkId)
            expect(goal.reminder.reminderId).toMatch(checkId)

            expect(goal.items.name).toBeTruthy()
            expect(goal.items.description).toBeTypeOf(expected.description)
            expect(goal.items.duration).toBe(expected.duration)

            expected.endDate = dayjs(expected.endDate).format("YYYY-MM-DD")
            expected.date = dayjs().format("YYYY-MM-DD") + "T"
            expected.startTime = dayjs(expected.date + expected.startTime).format("HH:mm:ss")
            expected.reminderTime = dayjs(expected.date + expected.startTime).subtract(5, 'm').format("HH:mm:ss")

            expect(goal.items.endDate).toSatisfy(value => expected.endDate === value)
            expect(goal.items.startTime).toSatisfy(value => expected.startTime === value)
            expect(goal.reminder.reminderTime).toSatisfy(value => expected.reminderTime === value)

            expect(goal.frequency.option).toEqual(expect.stringMatching(expected.option))
            expect(goal.frequency.marker).toEqual(expect.arrayContaining(expected.marker))

            expect(goal.reminder.isActive).toEqual(true)
            expect(goal.reminder.isSent).toEqual(false)

            expect(goal.items.goalUpdatedAt).toBeTruthy()
            expect(goal.reminder.reminderUpdatedAt).toBeTruthy()
        })

        it.for([
            {
                items: {
                    name: "Test",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices.",
                    frequency: {
                        option: "Weekly",
                        marker: ["Mon", "Wen", "Fri"]
                    }
                },
                expected: {
                    name: "Test",
                    description: "string",
                    frequency: "object",
                    reminder: "undefined",
                    duration: undefined,
                    startTime: {
                        validate: true
                    },
                    endDate: {
                        validate: true
                    },
                    option: {
                        option: "Weekly",
                        validate: false
                    },
                    marker: ["Mon", "Wen", "Fri"],
                    goalUpdatedAt: true,
                    reminderUpdatedAt: false
                }
            }, 
            {
                items: {
                    start_time: "17:00",
                    end_date: "02/02/2025",
                },
                expected: {
                    name: undefined,
                    description: "undefined",
                    frequency: "undefined",
                    reminder: "object",
                    duration: undefined,
                    startTime: {
                        time: "17:00",
                        validate: false
                    },
                    endDate: {
                        date: "02/02/2025",
                        validate: false
                    },
                    option: {
                        validate: true
                    },
                    marker: [],
                    goalUpdatedAt: true,
                    reminderUpdatedAt: true
                }
            }
        ])("update user goal", async ({ items, expected }) => {
            const goal = await readingServices.updateReadingGoalService({ goalId, items }, readingServiceObject)

            expect(goal).toBeInstanceOf(Object)
            expect(goal.reminder).toBeInstanceOf(Object)
            expect(goal.frequency).toBeTypeOf(expected.frequency)

            expect(goal.goalId).toMatch(checkId)

            expect(goal.items.name).toEqual(expected.name)
            expect(goal.items.description).toBeTypeOf(expected.description)
            expect(goal.items.duration).toBeUndefined()

            expected.endDate.date = dayjs(expected.endDate.date).format("YYYY-MM-DD")
            expected.date = dayjs().format("YYYY-MM-DD") + "T"
            expected.startTime.time = dayjs(expected.date + expected.startTime.time).format("HH:mm:ss")
            expected.reminderTime = dayjs(expected.date + expected.startTime.time).subtract(5, 'm').format("HH:mm:ss")

            expect(goal.items.end_date).toSatisfy(value => expected.endDate.validate || expected.endDate.date === value)
            expect(goal.items.start_time).toSatisfy(value => expected.startTime.validate || expected.startTime.time === value)
            expect(goal.reminder.reminder_time).toSatisfy(value => expected.startTime.validate || expected.reminderTime === value)

            expect(goal.frequency).toSatisfy(value => expected.option.validate || expect(value.option).toEqual(expected.option.option))
            expect(goal.frequency).toSatisfy(value => new Boolean(goal.frequency) || expect(value.marker).toEqual(expect.arrayContaining(expected.marker)))

            expect("updated_at" in goal.items).toEqual(expected.goalUpdatedAt)
            expect("updated_at" in  goal.reminder).toEqual(expected.reminderUpdatedAt)
        })

        it("delete a goal of user", async () => {
            const goal = await readingServices.deleteReadingGoalService({ goalId }, readingServiceObject)

            expect(goal).toBeInstanceOf(Object)

            expect(goal.goalId).toMatch(checkId)
        })

    })
})