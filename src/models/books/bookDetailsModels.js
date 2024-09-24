import { pool } from "../../db/index.js";

class BookDetailsModels {
    async getBookNotesModel ({ id }) {
        const query = `
            SELECT id, content, privacy, updated_at, book_id, book_locale_id 
            FROM notes
            RIGHT OUTER JOIN book_note
                ON notes.id = book_note.note_id
            WHERE book_note.book_id = $1
        `
        const values = [id]
        
        const queryResponse = await pool.query(query, values)

        return queryResponse.rows
    }

    async getBookQuotesModel ({ id }) {
        const query = `
            SELECT quotes.*, book_quote.book_id, book_quote.book_locale_id
            FROM quotes
            RIGHT OUTER JOIN book_quote
                ON quotes.id = book_quote.quote_id
            WHERE book_quote.book_id = $1
        `
        const values = [id]
        
        const queryResponse = await pool.query(query, values)

        return queryResponse.rows
    }

    async getBookExcerptsModel ({ id }) {
        const query = `
                SELECT excerpts.*, book_excerpt.book_id,  book_excerpt.book_locale_id 
                FROM excerpts
                RIGHT OUTER JOIN book_excerpt
                    ON excerpts.id = book_excerpt.excerpt_id
                WHERE book_excerpt.book_id = $1
            `
            const values = [id]
        
        const queryResponse = await pool.query(query, values)

        return queryResponse.rows
    }

    async getBookBookmarksModel ({ id }) {
        const query = `
            SELECT bookmark.id, lower(book_locale.page) as page, bookmark.book_id, bookmark.privacy 
            FROM bookmark
            LEFT OUTER JOIN book_locale
                ON bookmark.book_locale_id = book_locale.id
            WHERE bookmark.book_id = $1
        `
        const values = [id]
        
        const queryResponse = await pool.query(query, values)

        return queryResponse.rows
    }

    async getBookMetadataModel ({ id }) {
        const client = await pool.connect()

        try {
            client.query('BEGIN')

            const bookInfo = `
                SELECT * 
                FROM books
                WHERE books.id = $1
            `
            const bookInfoValues = [id]
            
            const bookInfoQueryResponse = (await client.query(bookInfo, bookInfoValues))

            const bookAuthor = `
                SELECT COUNT(id)
                FROM authors
                LEFT OUTER JOIN book_author
                    ON authors.id = book_author.author_id
                WHERE book_author.book_id = $1
            `
            const bookAuthorValues = [id]
            
            const bookAuthorQueryResponse = (await client.query(bookAuthor, bookAuthorValues))

            const bookPublisher = `
                SELECT COUNT(id)
                FROM publishers
                LEFT OUTER JOIN book_publisher
                    ON publishers.id = book_publisher.publisher_id
                WHERE book_publisher.book_id = $1
            `
            const bookPublisherValues = [id]
            
            const bookPublisherQueryResponse = (await client.query(bookPublisher, bookPublisherValues))

            const bookTag = `
                SELECT COUNT(id)
                FROM tags
                LEFT OUTER JOIN book_tag
                    ON tags.id = book_tag.tag_id
                WHERE book_tag.book_id = $1
            `
            const bookTagValues = [id]
            
            const bookTagQueryResponse = (await client.query(bookTag, bookTagValues))

            const bookCategory = `
                SELECT COUNT(id)
                FROM categories
                LEFT OUTER JOIN book_category
                    ON categories.id = book_category.category_id
                WHERE book_category.book_id = $1
            `
            const bookCategoryValues = [id]
            
            const bookCategoryQueryResponse = (await client.query(bookCategory, bookCategoryValues))

            const ratingsQuery = `
                SELECT COUNT(id) 
                FROM ratings
                LEFT OUTER JOIN book_rate
                    ON ratings.id = book_rate.rate_id
                WHERE book_rate.book_id = $1
            `
            const ratingsValues = [id]
            
            const ratingsQueryResponse = (await client.query(ratingsQuery, ratingsValues))

            const notesQuery = `
                SELECT COUNT(id) 
                FROM notes
                LEFT OUTER JOIN book_note
                    ON notes.id = book_note.note_id
                WHERE book_note.book_id = $1
            `
            const notesValues = [id]
            
            const notesQueryResponse = (await client.query(notesQuery, notesValues))

            const quoteQuery = `
                SELECT COUNT(id) 
                FROM quotes
                LEFT OUTER JOIN book_quote
                    ON quotes.id = book_quote.quote_id
                WHERE book_quote.book_id = $1
            `
            const quoteValues = [id]
            
            const quoteQueryResponse = (await client.query(quoteQuery, quoteValues))

            const excerptQuery = `
                SELECT COUNT(id) 
                FROM excerpts
                LEFT OUTER JOIN book_excerpt
                    ON excerpts.id = book_excerpt.excerpt_id
                WHERE book_excerpt.book_id = $1
            `
            const excerptValues = [id]
            
            const excerptQueryResponse = (await client.query(excerptQuery, excerptValues))

            const bookmarkQuery = `
                SELECT COUNT(id) 
                FROM bookmark
                WHERE book_id = $1
            `
            const bookmarkValues = [id]
            
            const bookmarkQueryResponse = (await client.query(bookmarkQuery, bookmarkValues))

            const userWithBookQuery = `
                SELECT COUNT(id) 
                FROM users
                LEFT OUTER JOIN book_user
                    ON users.id = book_user.user_id
                WHERE book_user.book_id = $1
            `
            const userWithBookValues = [id]
            
            const userWithBookQueryResponse = (await client.query(userWithBookQuery, userWithBookValues))

            const listWithBookQuery = `
                SELECT COUNT(id) 
                FROM lists
                LEFT OUTER JOIN list_books
                    ON lists.id = list_books.list_id
                WHERE list_books.book_id = $1
            `
            const listWithBookValues = [id]
            
            const listWithBookQueryResponse = (await client.query(listWithBookQuery, listWithBookValues))

            const readLaterQuery = `
                SELECT COUNT(id) 
                FROM read_later
                WHERE book_id = $1
            `
            const readLaterValues = [id]
            
            const readLaterQueryResponse = (await client.query(readLaterQuery, readLaterValues))

            const usersFinishedBookQuery = `
                SELECT COUNT(id) 
                FROM reading_progress
                WHERE book_id = $1 AND finished = true
            `
            const usersFinishedBookValues = [id]
            
            const usersFinishedBookQueryResponse = (await client.query(usersFinishedBookQuery, usersFinishedBookValues))

            const usersReadingBookQuery = `
                SELECT COUNT(id) 
                FROM reading_progress
                WHERE book_id = $1 AND finished = false AND started = true
            `
            const usersReadingBookValues = [id]
            
            const usersReadingBookQueryResponse = (await client.query(usersReadingBookQuery, usersReadingBookValues))

            client.query('COMMIT')

            return {
                bookInfo: {
                    ...bookInfoQueryResponse.rows[0],
                    authorCount: parseInt(bookAuthorQueryResponse.rows[0].count),
                    publisherCount: parseInt(bookPublisherQueryResponse.rows[0].count),
                    tagsCount: parseInt(bookTagQueryResponse.rows[0].count),
                    categoriesCount: parseInt(bookCategoryQueryResponse.rows[0].count)
                },
                ratingsCount: parseInt(ratingsQueryResponse.rows[0].count),
                notesCount: parseInt(notesQueryResponse.rows[0].count),
                quoteCount: parseInt(quoteQueryResponse.rows[0].count),
                excerptCount: parseInt(excerptQueryResponse.rows[0].count),
                bookmarkCount: parseInt(bookmarkQueryResponse.rows[0].count),
                listWithBookCount: parseInt(listWithBookQueryResponse.rows[0].count),
                readLaterCount: parseInt(readLaterQueryResponse.rows[0].count),
                userBook: {
                    userWithBookCount: parseInt(userWithBookQueryResponse.rows[0].count),
                    userReadingBookCount: parseInt(usersReadingBookQueryResponse.rows[0].count),
                    usersFinishedBookCount: parseInt(usersFinishedBookQueryResponse.rows[0].count)
                }
            }
        }
        catch (e) {
            client.query('ROLLBACK')
        }
        finally {
            client.release()
        }
    }
}

export { BookDetailsModels }