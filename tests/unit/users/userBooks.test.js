import { beforeEach, describe, expect, it } from "vitest"
import { UserBooksServices } from "../../../src/services/users/userBooksServices.js"
import { UserBookServiceObject } from "../serviceObjects/users/userBookServiceObject.js"

import { ulid } from "ulid"

describe("userBookServices", () => {
    let userBooksServices
    let userBookServiceObject
    let userId, bookId
    const checkId = /^[0-7][0-9A-HJKMNP-TV-Z]{25}$/

    beforeEach(() => {
        userBooksServices = new UserBooksServices()
        userBookServiceObject = new UserBookServiceObject();

        [userId, bookId] = [ulid(), ulid()]
    })

    it("get books from user", async () => {
        const userBooks = await userBooksServices.getUserBooksService({ userId }, userBookServiceObject)

        expect(userBooks).toBeInstanceOf(Object)

        expect(userBooks.userId).toMatch(checkId)

        expect(userBooks).toMatchObject({
            count: 0,
            userBooks: []
        })
    })

    it("add book to user", async () => {
        const userBook = await userBooksServices.addUserBookService({ userId, bookId }, userBookServiceObject)
        
        expect(userBook).toBeInstanceOf(Object)

        expect(userBook.userId).toMatch(checkId)
        expect(userBook.bookId).toMatch(checkId)
    })

    it("delete book to user", async () => {
        const userBook = await userBooksServices.removeUserBookService({ userId, bookId }, userBookServiceObject)
        
        expect(userBook).toBeInstanceOf(Object)

        expect(userBook.userId).toMatch(checkId)
        expect(userBook.bookId).toMatch(checkId)
    })
})