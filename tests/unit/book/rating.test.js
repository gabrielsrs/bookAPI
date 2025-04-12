import { beforeEach, describe, expect, it } from "vitest"
import { RatingServices } from "../../../src/services/book/ratingServices.js"
import { RatingServiceObject } from "../serviceObjects/book/ratingServiceObject.js"

import { ulid } from "ulid"

describe("ratingServices", () => {
    let ratingServices
    let ratingServiceObject
    let bookId, userId, rateId
    const checkId = /^[0-7][0-9A-HJKMNP-TV-Z]{25}$/
    
    beforeEach(() => {
        ratingServices = new RatingServices();
        ratingServiceObject = new RatingServiceObject();

        [bookId, userId, rateId] = [ulid(), ulid(), ulid()]
    })

    it("get ratings from books", async () => {
        const ratings = await ratingServices.getRatingsService({ bookId }, ratingServiceObject)

        expect(ratings).toBeInstanceOf(Object)
        expect(ratings.bookId).toMatch(checkId)
        expect(ratings).toMatchObject({
            count: 0,
            ratings: []
        })
    })
    
    it("create rate from a book", async () => {
        const items = {
            rateId,
            rating: 1,
        }

        const rate = await ratingServices.createRatingsService({ bookId, userId, items }, ratingServiceObject)
        
        expect(rate).toBeInstanceOf(Object)
        expect(rate.bookId).toMatch(checkId)
        expect(rate.userId).toMatch(checkId)

        expect(rate.items).toBeInstanceOf(Object)
        expect(rate.items.rateId).toMatch(checkId)
        expect(rate.items.rating).toBe(1)
        expect(rate.items.privacy).toEqual(false)
        
    })

    it("update rate from a book", async () => {
        const items = {
            privacy: true,
        }

        const rate = await ratingServices.updateRatingsService({ rateId, items }, ratingServiceObject)
        
        expect(rate).toBeInstanceOf(Object)
        expect(rate.rateId).toMatch(checkId)

        expect(rate.items).toBeInstanceOf(Object)
        expect(rate.items.rating).toBe(undefined)
        expect(rate.items.privacy).toEqual(true)
    })
    it("delete rate from a book", async () => {
        const ratings = await ratingServices.deleteRatingsService({ rateId }, ratingServiceObject)

        expect(ratings).toBeInstanceOf(Object)
        expect(ratings.rateId).toMatch(checkId)
        expect(ratings.rate).toBeInstanceOf(Array)
    })
})
