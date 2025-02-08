import { beforeEach, describe, expect, it } from "vitest"
import { ExcerptsServices } from "../../../src/services/users/excerptsServices.js"
import { ExcerptServiceObject } from "../serviceObjects/users/excerptServiceObject.js"

import { ulid } from "ulid"

describe("excerptsService", () => {
    let excerptsService
    let excerptServiceObject
    let userId, bookId, excerptId
    const checkId = /^[0-7][0-9A-HJKMNP-TV-Z]{25}$/

    beforeEach(() => {
        excerptsService = new ExcerptsServices()
        excerptServiceObject = new ExcerptServiceObject();

        [userId, bookId, excerptId] = [ulid(), ulid(), ulid()]
    })

    it("get all excerpts from a book of a user", async () => {
        const excerpts = await excerptsService.getExcerptsService({ userId, bookId }, excerptServiceObject)

        expect(excerpts).toBeInstanceOf(Object)
        expect(excerpts.bookId).toMatch(checkId)
        expect(excerpts.userId).toMatch(checkId)
        expect(excerpts).toMatchObject({
            count: 0,
            excerpts: []
        })
    })

    it("get all excerpts from all book of a user", async () => {
        const excerpts = await excerptsService.getExcerptsService({ userId }, excerptServiceObject)

        expect(excerpts).toBeInstanceOf(Object)
        expect(excerpts.userId).toMatch(checkId)
        expect(excerpts).toMatchObject({
            count: 0,
            excerpts: []
        })
    })

    it("create a excerpt to a user book", async () => {
        const items = {
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            privacy: false,
            book_locale: {
                page: 1,
                paragraph_number: 2,
                chapter_number: 3,
                word_offset: 4
            }
        }

        const excerpt = await excerptsService.createExcerptService({ userId, bookId, items }, excerptServiceObject)
        
        expect(excerpt).toBeInstanceOf(Object)
        expect(excerpt.items).toBeInstanceOf(Object)
        expect(excerpt.bookLocale).toBeInstanceOf(Object)

        expect(excerpt.items.excerptId).toMatch(checkId)
        expect(excerpt.bookId).toMatch(checkId)
        expect(excerpt.userId).toMatch(checkId)

        expect(excerpt.items.privacy).toEqual(false)
        expect(excerpt.items.content).toBeTypeOf('string')
        expect(excerpt.items.content).toHaveLength(74)

        expect(excerpt.bookLocale.page).toBe(1)
        expect(excerpt.bookLocale.paragraph_number).toBe(2)
        expect(excerpt.bookLocale.chapter_number).toBe(3)
        expect(excerpt.bookLocale.word_offset).toBe(4)


    })

    it("update a excerpt to a user book", async () => {
        const items = {
            privacy: true
        }

        const excerpt = await excerptsService.updateExcerptService({ excerptId, items }, excerptServiceObject)
        
        expect(excerpt).toBeInstanceOf(Object)
        expect(excerpt.items).toBeInstanceOf(Object)
        
        expect(excerpt.bookLocale).toBeTypeOf('undefined')
        expect(excerpt.excerptId).toBeTypeOf('string')
        
        expect(excerpt.excerptId).toMatch(checkId)

        expect(excerpt.items.bookLocale).toBeFalsy()

        expect(excerpt.items.privacy).toEqual(true)
    })

    it("delete a excerpt from a user book", async () => {
        const excerpt = await excerptsService.deleteExcerptService({ excerptId }, excerptServiceObject)

        expect(excerpt).toBeInstanceOf(Object)
        expect(excerpt.excerptId).toMatch(checkId)
    })
})