import { it, beforeEach, describe, expect } from "vitest"
import { BookServiceObject } from "../serviceObjects/book/bookDetailsServiceObject.js"
import { BookDetailsServices } from "../../src/services/book/bookDetailsServices.js"

import { ulid } from 'ulid'

describe('BookService', () => {
    let bookServiceObject
    let bookDetailsServices
    let bookId

    beforeEach(() => {
        bookServiceObject = new BookServiceObject()
        bookDetailsServices = new BookDetailsServices()

        bookId = ulid()
    })

    it("get notes from a book", async () => {
        const notes = await bookDetailsServices.getBookNotesService({ bookId}, bookServiceObject)

        expect(notes.bookId).toMatch(/^[0-7][0-9A-HJKMNP-TV-Z]{25}$/)

        expect(notes).toBeInstanceOf(Object)
        expect(notes).toMatchObject({
            count: 0,
            notes: []
        })
    })

    it("get quotes from a book", async () => {
        const quotes = await bookDetailsServices.getBookQuotesService({ bookId }, bookServiceObject)

        expect(quotes.bookId).toMatch(/^[0-7][0-9A-HJKMNP-TV-Z]{25}$/)

        expect(quotes).toBeInstanceOf(Object)
        expect(quotes).toMatchObject({
            count: 0,
            quotes: []
        })
    })

    it("get excerpts from a book", async () => {
        const excerpts = await bookDetailsServices.getBookExcerptsService({ bookId }, bookServiceObject)

        expect(excerpts.bookId).toMatch(/^[0-7][0-9A-HJKMNP-TV-Z]{25}$/)

        expect(excerpts).toBeInstanceOf(Object)
        expect(excerpts).toMatchObject({
            count: 0,
            excerpts: []
        })
    })

    it("get bookmarks from a book", async () => {
        const bookmarks = await bookDetailsServices.getBookBookmarksService({ bookId }, bookServiceObject)
        
        expect(bookmarks.bookId).toMatch(/^[0-7][0-9A-HJKMNP-TV-Z]{25}$/)

        expect(bookmarks).toBeInstanceOf(Object)
        expect(bookmarks).toMatchObject({
            count: 0,
            bookmarks: []
        })
    })

    it("get metadata", async () => {
        const metadata = await bookDetailsServices.getBookMetadataService({ bookId }, bookServiceObject)

        expect(metadata.bookId).toMatch(/^[0-7][0-9A-HJKMNP-TV-Z]{25}$/)

        expect(metadata).toBeInstanceOf(Object)
    })
})