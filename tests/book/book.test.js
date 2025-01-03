import { it, beforeEach, describe, expect } from "vitest"
import { BookServiceObject } from "../serviceObjects/book/bookServiceObject.js"
import { BookServices } from "../../src/services/book/bookServices.js"

import { ulid } from 'ulid'

describe('BookService', () => {
    let bookServiceObject
    let bookServices

    beforeEach(() => {
        bookServiceObject = new BookServiceObject()
        bookServices = new BookServices()
    })

    it("get a single book(with id)", async () => {
        const bookId = ulid()

        const book = await bookServices.getBookService({ bookId }, bookServiceObject)
        expect(book).toMatch(/^[0-7][0-9A-HJKMNP-TV-Z]{25}$/)
    })

    it("get all books(without id)", async () => {
        const books = await bookServices.getBookService({}, bookServiceObject)
        expect(books).toBeInstanceOf(Object)
        expect(books.count).toBe(0)
        expect(books.books).toBeInstanceOf(Array)
    })

    it.for([
        {
            items: {
                title: "Book 1",
                authors: [
                    { first_name: "Author 1" }, 
                    { first_name: "Author 2" }
                ],
                publishers: [
                    { name: "Publisher 1" }
                ],
                tags: [
                    { name: "Tag 1" }
                ],
                categories: [
                    { name: "Category 1" }
                ]
            },
            expected: {
                authors: 2,
                publishers: 1,
                tags: 1,
                categories: 1
            }
        },
        {
            items : {
                title: "Book 1",
                authors: [
                    { first_name: "Author 1" }, 
                    { first_name: "Author 2" },
                    { first_name: "Author 3" }
                ],
                publishers: [
                    { name: "Publisher 1" },
                    { name: "Publisher 2" }
                ],
                tags: [
                    { name: "Tag 1" },
                    { name: "Tag 2" },
                    { name: "Tag 3" },
                    { name: "Tag 4" }
                ],
                categories: [
                    { name: "Category 1" },
                    { name: "Category 2" }
                ]
            },
            expected: {
                authors: 3,
                publishers: 2,
                tags: 4,
                categories: 2
            }
        },
    ])("create a book", async ({ items, expected }) => {
        const regexId = /^[0-7][0-9A-HJKMNP-TV-Z]{25}$/
        const regexUpdateAt = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/

        const book = await bookServices.createBookService({ items }, bookServiceObject)

        expect(book).toBeInstanceOf(Object)
        expect(book.authors).toBeInstanceOf(Array)
        expect(book.publishers).toBeInstanceOf(Array)
        expect(book.tags).toBeInstanceOf(Array)
        expect(book.categories).toBeInstanceOf(Object)

        expect(book.bookId).toMatch(regexId)
        expect(book.authors[0].authorId).toMatch(regexId)
        expect(book.publishers[0].publisherId).toMatch(regexId)
        expect(book.tags[0].tagId).toMatch(regexId)
        expect(book.categories[0].categoryId).toMatch(regexId)

        expect(book.bookUpdatedAt).toMatch(regexUpdateAt)
        expect(book.authors[0].authorUpdatedAt).toMatch(regexUpdateAt)
        expect(book.publishers[0].publisherUpdatedAt).toMatch(regexUpdateAt)

        expect(book.authors).toHaveLength(expected.authors)
        expect(book.publishers).toHaveLength(expected.publishers)
        expect(book.tags).toHaveLength(expected.tags)
        expect(book.categories).toHaveLength(expected.categories)

    })

    describe.each([
        {
            items: {
                categories: [
                    { name: "Category 1" }
                ]
            },
            expected: {
                book: false,
                authors: 0,
                publishers: 0,
                tags: 0,
                categories: 1
            }
        },
        {
            items : {
                title: "Book 1",
                publishers: [
                    { name: "Publisher 1" },
                    { name: "Publisher 2" }
                ],
                categories: [
                    { name: "Category 1" },
                    { name: "Category 2" }
                ]
            },
            expected: {
                book: true,
                authors: 0,
                publishers: 2,
                tags: 0,
                categories: 2
            }
        },
    ])("update book relate information", async ({ items, expected }) => {
        bookServiceObject = new BookServiceObject()
        bookServices = new BookServices()

        const bookId = ulid()

        const book = await bookServices.updateBookService({ bookId, items }, bookServiceObject)

        it("book data update", () => {
            expect(book).toBeInstanceOf(Object)
            expect(book.book.bookId).toBeTruthy()
        })

        it.runIf(expected.book)("book data update", () => {
            expect(book.book).toBeInstanceOf(Object)
            expect(book.book.updated_at).toBeTruthy()
        })

        it.runIf(items.authors)("book data update", () => {
            expect(book.items.authors[0].updated_at).toBeTruthy()
            expect(book.items.authors).toHaveLength(expected.authors)
        })

        it.runIf(items.publishers)("book data update", () => {
            expect(book.items.publishers[0].updated_at).toBeTruthy()
            expect(book.items.publishers).toHaveLength(expected.publishers)
        })

        it.runIf(items.tags)("book data update", () => {
            expect(book.items.tags).toBeInstanceOf(Array)
            expect(book.items.tags).toHaveLength(expected.tags)
        })

        it.runIf(items.categories)("book data update", () => {
            expect(book.items.categories).toBeInstanceOf(Array)
            expect(book.items.categories).toHaveLength(expected.categories)
        })
    })

    it("delete book", async () => {
        const bookId = ulid()

        const book = await bookServices.deleteBookService({ bookId }, bookServiceObject)
        expect(book).toMatch(/^[0-7][0-9A-HJKMNP-TV-Z]{25}$/)
    })
})