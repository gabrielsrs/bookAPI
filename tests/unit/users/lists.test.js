import { beforeEach, describe, expect, it } from "vitest"
import { ListsServices } from "../../../src/services/users/listsServices.js"
import { ListServiceObject } from "../serviceObjects/users/listServiceObject.js"

import { ulid } from "ulid"

describe("listService", () => {
    let listsServices
    let listServiceObject
    let userId, listId, bookId
    const checkId = /^[0-7][0-9A-HJKMNP-TV-Z]{25}$/

    beforeEach(() => {
        listsServices = new ListsServices()
        listServiceObject = new ListServiceObject();

        [userId, listId, bookId] = [ulid(), ulid(), ulid()]
    })

    describe("list crud", () =>{
        it("get specific user list", async () => {
            const list = await listsServices.getListsService({ userId, listId }, listServiceObject)

            expect(list).toBeInstanceOf(Object)

            expect(list.userId).toMatch(checkId)
            expect(list.listId).toMatch(checkId)
        })

        it("get all lists from a user", async () => {
            const lists = await listsServices.getListsService({ userId }, listServiceObject)

            expect(lists).toBeInstanceOf(Object)

            expect(lists.userId).toMatch(checkId)

            expect(lists).toMatchObject({
                count: 0,
                lists: []
            })
        })

        it("create list", async () => {
            const items = {
                name: "test",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque luctus.",
                privacy: true
            }

            const list = await listsServices.createListService({ userId, items }, listServiceObject)

            expect(list).toBeInstanceOf(Object)

            expect(list.userId).toMatch(checkId)
            expect(list.items.listId).toMatch(checkId)

            expect(list.items.name).toEqual("test")
            expect(list.items.description).toHaveLength(77)
            expect(list.items.privacy).toEqual(true)
            expect(list.items.updatedAt).toBeTruthy()
        })

        it("update list infos", async () => {
            const items = {
                description: "Lorem ipsum dolor sit amet.",
                privacy: false
            }

            const list = await listsServices.updateListService({ listId, items }, listServiceObject)

            expect(list).toBeInstanceOf(Object)

            expect(list.listId).toMatch(checkId)

            expect(list.items.description).toHaveLength(27)
            expect(list.items.privacy).toEqual(false)
            expect(list.items.updated_at).toBeTruthy()
        })

        it("delete list", async () => {
            const list = await listsServices.deleteListService({ listId }, listServiceObject)

            expect(list).toBeInstanceOf(Object)

            expect(list.listId).toMatch(checkId)
        })
    })

    describe("book to list", () =>{
        it("add book in list", async () => {
            const bookList = await listsServices.addBookToListService({ listId, bookId }, listServiceObject)

            expect(bookList).toBeInstanceOf(Object)

            expect(bookList.listId).toMatch(checkId)
            expect(bookList.bookId).toMatch(checkId)
        })

        it("remove book from list", async () => {
            const bookList = await listsServices.removeBookFromListService({ listId, bookId }, listServiceObject)

            expect(bookList).toBeInstanceOf(Object)

            expect(bookList.listId).toMatch(checkId)
            expect(bookList.bookId).toMatch(checkId)
        })
    })

    describe("like list", () =>{
        it("get all likes from a unique list from a user ", async () => {
            const likes = await listsServices.getLikedListsService({ userId, listId }, listServiceObject)

            expect(likes).toBeInstanceOf(Object)

            expect(likes.userId).toMatch(checkId)
            expect(likes.listId).toMatch(checkId)

            expect(likes).toMatchObject({
                count: 0,
                likes: {}
            })
        })

        it("get all likes from all lists from a user", async () => {
            const likes = await listsServices.getLikedListsService({ userId }, listServiceObject)

            expect(likes).toBeInstanceOf(Object)

            expect(likes.userId).toMatch(checkId)

            expect(likes).toMatchObject({
                count: 1,
                likes: [
                    {
                        likesCount: 0,
                        users_likes: []
                    }
                ]
            })
        })

        it("user like a list", async () => {
            const like = await listsServices.likeListService({ userId, listId }, listServiceObject)

            expect(like).toBeInstanceOf(Object)

            expect(like.userId).toMatch(checkId)
            expect(like.listId).toMatch(checkId)
        })

        it("user unlike a list", async () => {
            const unlike = await listsServices.unlikeListService({ userId, listId }, listServiceObject)

            expect(unlike).toBeInstanceOf(Object)

            expect(unlike.userId).toMatch(checkId)
            expect(unlike.listId).toMatch(checkId)
        })
    })

    describe("follow list", () =>{
        it("get all follows from a unique list from a user ", async () => {
            const follows = await listsServices.getFollowedListsService({ userId, listId }, listServiceObject)

            expect(follows).toBeInstanceOf(Object)

            expect(follows.userId).toMatch(checkId)
            expect(follows.listId).toMatch(checkId)

            expect(follows).toMatchObject({
                count: 0,
                follows: {}
            })
        })

        it("get all follows from all lists from a user", async () => {
            const follows = await listsServices.getFollowedListsService({ userId }, listServiceObject)

            expect(follows).toBeInstanceOf(Object)

            expect(follows.userId).toMatch(checkId)

            expect(follows).toMatchObject({
                count: 1,
                follows: [
                    {
                        followsCount: 0,
                        users_followers: []
                    }
                ]
            })
        })

        it("user follow a list", async () => {
            const follow = await listsServices.followListService({ userId, listId }, listServiceObject)

            expect(follow).toBeInstanceOf(Object)

            expect(follow.userId).toMatch(checkId)
            expect(follow.listId).toMatch(checkId)
        })

        it("user unlike a list", async () => {
            const unfollow = await listsServices.unfollowListService({ userId, listId }, listServiceObject)

            expect(unfollow).toBeInstanceOf(Object)

            expect(unfollow.userId).toMatch(checkId)
            expect(unfollow.listId).toMatch(checkId)
        })
    })
})