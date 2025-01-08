import { beforeEach, describe, expect, it } from "vitest"
import { ReadLaterServices } from "../../src/services/users/readLaterServices.js"
import { ReadLaterServiceObject } from "../serviceObjects/users/readLaterServiceObject.js"

import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)

import { ulid } from "ulid"

describe("readLaterService", () => {
    let readLaterServices
    let readLaterServiceObject
    let userId, bookId
    const checkId = /^[0-7][0-9A-HJKMNP-TV-Z]{25}$/

    beforeEach(() => {
        readLaterServices = new ReadLaterServices()
        readLaterServiceObject = new ReadLaterServiceObject();

        [userId, bookId] = [ulid(), ulid()]
    })

    it("get readLater from a user", async () => {
        const readLater = await readLaterServices.getReadLaterService({ userId }, readLaterServiceObject)

        expect(readLater).toBeInstanceOf(Object)
        expect(readLater.userId).toMatch(checkId)
        expect(readLater).toMatchObject({
            count: 0,
            readLater: []
        })
    })

    it("create readLater to a user", async () => {
        const readLater = await readLaterServices.createReadLaterService({ userId, bookId, items: {} }, readLaterServiceObject)

        expect(readLater).toBeInstanceOf(Object)

        expect(readLater.items.readLaterId).toMatch(checkId)
        expect(readLater.userId).toMatch(checkId)
        expect(readLater.bookId).toMatch(checkId)

        expect(readLater.items.privacy).toEqual(false)

        expect(readLater.items.updatedAt).toSatisfy(value => dayjs(value, "YYYY-MM-DD[T]HH:mm:ss", true).isValid())
    })

    it("delete readLater from a user", async() => {
        const readLater = await readLaterServices.deleteReadLaterService({ userId, bookId }, readLaterServiceObject)

        expect(readLater).toBeInstanceOf(Object)

        expect(readLater.userId).toMatch(checkId)
        expect(readLater.bookId).toMatch(checkId)
    })
})