import { beforeEach, describe, expect, it } from "vitest"
import { BookmarksServices } from "../../../src/services/users/bookmarksServices.js"
import { BookmarkServiceObject } from "../serviceObjects/users/bookmarkServiceObject.js"

import { ulid } from "ulid"

describe("bookmarkService", () => {
    let bookmarksServices
    let bookmarkServiceObject
    let userId, bookId, bookmarkId
    const checkId = /^[0-7][0-9A-HJKMNP-TV-Z]{25}$/

    beforeEach(() => {
        bookmarksServices = new BookmarksServices()
        bookmarkServiceObject = new BookmarkServiceObject();

        [userId, bookId, bookmarkId] = [ulid(), ulid(), ulid()]
    })

    it("get all bookmarks from a book of a user", async () => {
        const bookmarks = await bookmarksServices.getBookmarksService({ userId, bookId }, bookmarkServiceObject)

        expect(bookmarks).toBeInstanceOf(Object)
        expect(bookmarks.bookId).toMatch(checkId)
        expect(bookmarks.userId).toMatch(checkId)
        expect(bookmarks).toMatchObject({
            count: 0,
            bookmarks: []
        })
    })

    it("get all bookmarks from all book of a user", async () => {
        const bookmarks = await bookmarksServices.getBookmarksService({ userId }, bookmarkServiceObject)

        expect(bookmarks).toBeInstanceOf(Object)
        expect(bookmarks.userId).toMatch(checkId)
        expect(bookmarks).toMatchObject({
            count: 0,
            bookmarks: []
        })
    })

    it("create a bookmark to a user book", async () => {
        const items = {
            book_locale: {
                page: 23,
            }
        }

        const bookmark = await bookmarksServices.createBookmarkService({ userId, bookId, items }, bookmarkServiceObject)
        
        expect(bookmark).toBeInstanceOf(Object)
        expect(bookmark.items).toBeInstanceOf(Object)
        expect(bookmark.bookLocale).toBeInstanceOf(Object)

        expect(bookmark.items.bookmarkId).toMatch(checkId)
        expect(bookmark.items.bookId).toMatch(checkId)
        expect(bookmark.items.userId).toMatch(checkId)

        expect(bookmark.items.privacy).toEqual(true)

        expect(bookmark.bookLocale.page).toBe(23)


    })
    it("delete a bookmark from a user book", async () => {
        const bookmark = await bookmarksServices.deleteBookmarkService({ bookmarkId }, bookmarkServiceObject)

        expect(bookmark).toBeInstanceOf(Object)
        expect(bookmark.bookmarkId).toMatch(checkId)
    })
})