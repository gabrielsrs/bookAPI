import { beforeEach, describe, expect, it } from "vitest"
import { FollowsServices } from "../../src/services/users/followsServices.js"
import { FollowServiceObject } from "../serviceObjects/users/followServiceObject.js"

import { ulid } from "ulid"

describe("followService", () => {
    let followsServices
    let followServiceObject
    let userId, follow, followId
    const checkId = /^[0-7][0-9A-HJKMNP-TV-Z]{25}$/

    beforeEach(() => {
        followsServices = new FollowsServices()
        followServiceObject = new FollowServiceObject();

        [userId, follow, followId] = [ulid(), ulid(), ulid()]
    })

    it("get followers and followings from a user", async () => {
        const follows = await followsServices.getFollowsService({ userId }, followServiceObject)

        expect(follows).toBeInstanceOf(Object)
        expect(follows.userId).toMatch(checkId)
        expect(follows).toMatchObject({
            followingCount: 0,
            followerCount: 0,
            followings: [],
            followers: []
        })

    })

    it("create user following someone", async () => {
        const following = await followsServices.createFollowService({ userId, follow }, followServiceObject)
        
        expect(following).toBeInstanceOf(Object)
        expect(following.followId).toMatch(checkId)
        expect(following.follow).toMatch(checkId)
        expect(following.followed).toMatch(checkId)
    })

    it("user unfollow someone", async () => {
        const unfollow = await followsServices.deleteFollowService({ userId, follow }, followServiceObject)
        
        expect(unfollow).toBeInstanceOf(Object)
        expect(unfollow.unfollow).toMatch(checkId)
        expect(unfollow.unfollowed).toMatch(checkId)
    })
})