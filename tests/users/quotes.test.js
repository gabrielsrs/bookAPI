import { beforeEach, describe, expect, it } from "vitest"
import { QuotesServices } from "../../src/services/users/quotesServices.js"
import { QuoteServiceObject } from "../serviceObjects/users/quoteServiceObject.js"

import { ulid } from "ulid"

describe("quotesService", () => {
    let quotesService
    let quoteServiceObject
    let userId, bookId, quoteId
    const checkId = /^[0-7][0-9A-HJKMNP-TV-Z]{25}$/

    beforeEach(() => {
        quotesService = new QuotesServices()
        quoteServiceObject = new QuoteServiceObject();

        [userId, bookId, quoteId] = [ulid(), ulid(), ulid()]
    })

    it("get all quotes from a book of a user", async () => {
        const quotes = await quotesService.getQuotesService({ userId, bookId }, quoteServiceObject)

        expect(quotes).toBeInstanceOf(Object)
        expect(quotes.bookId).toMatch(checkId)
        expect(quotes.userId).toMatch(checkId)
        expect(quotes).toMatchObject({
            count: 0,
            quotes: []
        })
    })

    it("get all quotes from all book of a user", async () => {
        const quotes = await quotesService.getQuotesService({ userId }, quoteServiceObject)

        expect(quotes).toBeInstanceOf(Object)
        expect(quotes.userId).toMatch(checkId)
        expect(quotes).toMatchObject({
            count: 0,
            quotes: []
        })
    })

    it("create a quote to a user book", async () => {
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

        const quote = await quotesService.createQuoteService({ userId, bookId, items }, quoteServiceObject)
        
        expect(quote).toBeInstanceOf(Object)
        expect(quote.items).toBeInstanceOf(Object)
        expect(quote.bookLocale).toBeInstanceOf(Object)

        expect(quote.items.quoteId).toMatch(checkId)
        expect(quote.bookId).toMatch(checkId)
        expect(quote.userId).toMatch(checkId)

        expect(quote.items.privacy).toEqual(false)
        expect(quote.items.content).toBeTypeOf('string')
        expect(quote.items.content).toHaveLength(74)

        expect(quote.bookLocale.page).toBe(1)
        expect(quote.bookLocale.paragraph_number).toBe(2)
        expect(quote.bookLocale.chapter_number).toBe(3)
        expect(quote.bookLocale.word_offset).toBe(4)


    })

    it("update a quote to a user book", async () => {
        const items = {
            privacy: true
        }

        const quote = await quotesService.updateQuoteService({ quoteId, items }, quoteServiceObject)
        
        expect(quote).toBeInstanceOf(Object)
        expect(quote.items).toBeInstanceOf(Object)
        
        expect(quote.bookLocale).toBeTypeOf('undefined')
        expect(quote.quoteId).toBeTypeOf('string')
        
        expect(quote.quoteId).toMatch(checkId)

        expect(quote.items.bookLocale).toBeFalsy()

        expect(quote.items.privacy).toEqual(true)
    })

    it("delete a quote from a user book", async () => {
        const quote = await quotesService.deleteQuoteService({ quoteId }, quoteServiceObject)

        expect(quote).toBeInstanceOf(Object)
        expect(quote.quoteId).toMatch(checkId)
    })
})