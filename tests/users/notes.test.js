import { beforeEach, describe, expect, it } from "vitest"
import { NotesServices } from "../../src/services/users/notesServices.js"
import { NotesServiceObject } from "../serviceObjects/users/noteServiceObject.js"

import { ulid } from "ulid"

describe("notesService", () => {
    let notesServices
    let notesServiceObject
    let userId, bookId, noteId
    const checkId = /^[0-7][0-9A-HJKMNP-TV-Z]{25}$/

    beforeEach(() => {
        notesServices = new NotesServices()
        notesServiceObject = new NotesServiceObject();

        [userId, bookId, noteId] = [ulid(), ulid(), ulid()]
    })

    it("get all notes from a book", async () => {
        const notes = await notesServices.getNotesService({ userId, bookId }, notesServiceObject)
        
        expect(notes).toBeInstanceOf(Object)

        expect(notes.userId).toMatch(checkId)
        expect(notes.bookId).toMatch(checkId)

        expect(notes).toMatchObject({
            count: 0,
            notes: []
        })
    })

    it("get all notes from user", async () => {
        const notes = await notesServices.getNotesService({ userId, bookId }, notesServiceObject)
        
        expect(notes).toBeInstanceOf(Object)

        expect(notes.userId).toMatch(checkId)

        expect(notes).toMatchObject({
            count: 0,
            notes: []
        })
    })

    it.for([{
            items: {
                content: "Note without book locale, to not add id and with privacy.",
                privacy: false
            }, expected: {
                bookLocaleType: "undefined",
                contentLength: 57,
                privacy: false,
                bookLocaleObject: undefined,
            }
        }, {
            items: {
                content: "Note with book locale to add id but without privacy to add it.",
                book_locale: {
                    page: 0,
                    location_identifier: {
                        local: "page one"
                    }
                }
            }, expected: {
                bookLocaleType: "object",
                contentLength: 62,
                privacy: true,
                bookLocaleObject: {
                    page: 0,
                    location_identifier: {
                        local:  "page one"
                    }
                },
            }
    }])("create a note", async ({ items, expected }) => {
        const note = await notesServices.createNoteService({ userId, bookId, items }, notesServiceObject)

        expect(note).toBeInstanceOf(Object)
        expect(note.items).toBeInstanceOf(Object)
        expect(note.bookLocale).toBeTypeOf(expected.bookLocaleType)

        expect(note.items.noteId).toMatch(checkId)
        expect(note.userId).toMatch(checkId)
        expect(note.bookId).toMatch(checkId)

        expect(note.items.content).toHaveLength(expected.contentLength)
        expect(note.items.privacy).toEqual(expected.privacy)
        expect(note.items.updatedAt).toBeTruthy()

        expect(note.bookLocale).toMatchObject(expected.bookLocaleObject)
    })

    it.for([{
        items: {
            privacy: true
        }, expected: {
            bookLocaleType: "undefined",
            privacy: true,
            bookLocaleObject: undefined,
        }
    }, {
        items: {
            book_locale: {
               page: 1,
                paragraph_number: 2,
                chapter_number: 3,
                word_offset: 4,
                location_identifier: {
                    color: "red"
                }
            }
        }, expected: {
            bookLocaleType: "object",
            privacy: undefined,
            bookLocaleObject: {
                page: 1,
                paragraph_number: 2,
                chapter_number: 3,
                word_offset: 4,
                location_identifier: {
                    color: "red"
                }
            },
        }
    }])("update a note", async ({ items, expected }) => {
        const note = await notesServices.updateNoteService({ noteId, items }, notesServiceObject)

        expect(note).toBeInstanceOf(Object)
        expect(note.items).toBeInstanceOf(Object)
        expect(note.bookLocale).toBeTypeOf(expected.bookLocaleType)

        expect(note.noteId).toMatch(checkId)

        expect(note.items.content).toBeFalsy()
        expect(note.items.privacy).toEqual(expected.privacy)
        expect(note.items.updated_at).toBeTruthy()

        expect(note.bookLocale).toMatchObject(expected.bookLocaleObject)
    })

    it("delete a note", async () => {
        const note = await notesServices.deleteNoteService({ noteId }, notesServiceObject)

        expect(note).toBeInstanceOf(Object)

        expect(note.noteId).toMatch(checkId)
    })
})