import { pool } from "../../db/index.js"

class NotesModels {
    async getBookNotesModel({ userId, bookId }) {
        const query = `
            SELECT * 
            FROM notes
            JOIN book_note
                ON notes.id = book_note.note_id
            WHERE book_note.user_id = $1 AND book_note.book_id = $2
        `

        const values = [userId, bookId]

        const queryResponse = await pool.query(query, values)

        return {
            notes: queryResponse.rows
        }
        
    }

    async getBooksNotesModel({ userId }) {
        const query = `
            SELECT * 
            FROM notes
            JOIN book_note
                ON notes.id = book_note.note_id
            WHERE book_note.user_id = $1
        `

        const values = [userId]

        const queryResponse = await pool.query(query, values)

        return {
            notes: queryResponse.rows
        }
        
    }

    async createNoteModel ({ userId, bookId, items: {
        noteId,
        content,
        privacy,
        updatedAt
    }, bookLocale: {
        bookLocaleId,
        page,
        paragraph_number,
        chapter_number,
        word_offset,
        location_identifier
    } }) {
        const client = await pool.connect()

        try {
            let bookLocaleResponse
            client.query('BEGIN')

            const noteQuery = `
                INSERT INTO notes (id, content, privacy, updated_at)
                VALUES ($1, $2, $3, $4)
                RETURNING id
            `

            const noteValues = [noteId, content, privacy, updatedAt]

            const noteQueryResponse = await client.query(noteQuery, noteValues)

            if (bookLocaleId) {
                const bookLocaleQuery = `
                    INSERT INTO book_locale (id, page, paragraph_number, chapter_number, word_offset, location_identifier)
                    VALUES ($1, $2, $3, $4, $5, $6, $7)
                    RETURNING id
                `

                const bookLocaleValues = [bookLocaleId, page, paragraph_number, chapter_number, word_offset, location_identifier]

                bookLocaleResponse = await client.query(bookLocaleQuery, bookLocaleValues)
            }

            const bookNoteQuery = `
                INSERT INTO book_note (note_id, book_id, user_id, book_locale_id)
                VALUES ($1, $2, $3, $4)
                RETURNING note_id
            `

            const bookNoteValues = [noteId, bookId, userId, bookLocaleId]

            const bookNoteResponse = await client.query(bookNoteQuery, bookNoteValues)

            await client.query('COMMIT')

            return {
                note: noteQueryResponse.rows[0],
                bookLocale: bookLocaleResponse.rows[0] || []
            }

        } catch (err) {
            client.query('ROLLBACK')

        } finally {
            client.release()
        }
    }
    
    async updateNoteModel ({ noteId, items, bookLocale}) {
        const client = await pool.connect()

        try {
            let bookLocaleResponse
            client.query('BEGIN')

            if (items) {
                const noteQuery = `
                    UPDATE notes
                    SET ${Object.entries(items).map(item => `${item[0]} = ${item[1]}`)}
                    WHERE id = $1
                    RETURNING id
                `

                const noteValues = [noteId]

                const noteQueryResponse = await client.query(noteQuery, noteValues)
            }

            if (bookLocale) {
                const bookLocaleQuery = `
                    WITH book_locale_id AS (
                        SELECT book_locale_id FROM book_note WHERE note_id = $1
                    )
                    UPDATE book_locale
                    SET ${Object.entries(bookLocale).map(item => `${item[0]} = ${item[1]}`)}
                    WHERE id = book_locale_id
                    RETURNING id
                `

                const bookLocaleValues = [noteId]

                bookLocaleResponse = await client.query(bookLocaleQuery, bookLocaleValues)
            }

            await client.query('COMMIT')

            return {
                note: noteQueryResponse.rows[0],
                bookLocale: bookLocaleResponse.rows[0] || []
            }

        } catch (err) {
            client.query('ROLLBACK')

        } finally {
            client.release()
        }
    }
    
    async deleteNoteModel ({ noteId }) {
        const client = await pool.connect()

        try {
            client.query('BEGIN')

            const noteQuery = `
                DELETE FROM notes
                WHERE id = $1
                RETURNING id
            `

            const noteValues = [noteId]

            const noteQueryResponse = await client.query(noteQuery, noteValues)

            const bookLocaleQuery = `
                WITH book_locale_id AS (
                    SELECT book_locale_id FROM book_note WHERE note_id = $1
                )
                DELETE FROM book_locale
                WHERE id = book_locale_id
                RETURNING id
            `

            const bookLocaleValues = [noteId]

            const bookLocaleResponse = await client.query(bookLocaleQuery, bookLocaleValues)

            const bookNoteQuery = `
                DELETE FROM book_note
                WHERE note_id = $1
                RETURNING note_id 
            `

            const bookNoteValues = [noteId]

            const bookNoteResponse = await client.query(bookNoteQuery, bookNoteValues)

            await client.query('COMMIT')

            return {
                note: noteQueryResponse.rows[0],
                bookLocale: bookLocaleResponse.rows[0]
            }

        } catch (err) {
            client.query('ROLLBACK')

        } finally {
            client.release()
        }
    }
    
}

export { NotesModels }