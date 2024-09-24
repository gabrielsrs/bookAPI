import { pool } from "../../db/index.js"

class NotesModels {
    async getBookNotesModel({id, bookId}) {
        const query = `
            SELECT * 
            FROM notes
            JOIN book_note
                ON notes.id = book_note.note_id
            WHERE book_note.user_id = $1 AND book_note.book_id = $2
        `

        const values = [id, bookId]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows
        
    }

    async getBooksNotesModel({id}) {
        const query = `
            SELECT * 
            FROM notes
            JOIN book_note
                ON notes.id = book_note.note_id
            WHERE book_note.user_id = $1
        `

        const values = [id]

        const queryResponse = await pool.query(query, values)

        return queryResponse.rows
        
    }
}

export { NotesModels }