import { beforeEach, describe, expect, it } from "vitest"
import { UsersServices } from "../../../src/services/users/usersServices.js"
import { UserServiceObject } from "../serviceObjects/users/userServiceObject.js"

import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)

import { ulid } from "ulid"

describe("usersServices", () => {
    let usersServices
    let userServiceObject
    let userId
    const checkId = /^[0-7][0-9A-HJKMNP-TV-Z]{25}$/

    beforeEach(() => {
        usersServices = new UsersServices()
        userServiceObject = new UserServiceObject();

        userId = ulid()
    })

    it("get user", async () => {
        const user = await usersServices.getUsersService({ userId }, userServiceObject)
        
        expect(user).toBeInstanceOf(Object)
        expect(user.userId).toMatch(checkId)
    })

    it("get all users", async () => {
        const users = await usersServices.getUsersService({}, userServiceObject)
        
        expect(users).toBeInstanceOf(Object)

        expect(users).toMatchObject({
            count: 0,
            users: []
        })
    })

    it("create user", async () => {
        const items = {
            nickname: "Test"
        }

        const user = await usersServices.createUserService({ items }, userServiceObject)

        expect(user).toBeInstanceOf(Object)

        expect(user.items.userId).toMatch(checkId)
        expect(user.items.nickname).toEqual(items.nickname)
        expect(user.items.updatedAt).toSatisfy(value => dayjs(value, "YYYY-MM-DD[T]HH:mm:ss", true).isValid())
    })

    it("update user info", async () => {
        const items = {
            nickname: "Test"
        }

        const user = await usersServices.updateUserService({ userId, items }, userServiceObject)

        expect(user).toBeInstanceOf(Object)

        expect(user.userId).toMatch(checkId)
        expect(user.items.update_at).toSatisfy(value => dayjs(value, "YYYY-MM-DD[T]HH:mm:ss", true).isValid())
    })

    it("delete user", async () => {
        const user = await usersServices.deleteUserService({ userId }, userServiceObject)

        expect(user).toBeInstanceOf(Object)
        expect(user.userId).toMatch(checkId)
    })
})