import { pool } from "../../db";

class BookDetailsModels {
    getBookNotesModels({ id }) {
        const query = ``
        const values = [id]

        const queryResponse = pool.query(query, values)

        return queryResponse
    }
}

export { BookDetailsModels }