import { pool } from "../../db/index.js"

class BookModels {
    async getBookModel ({ id }) {
        const query = `
            WITH authors AS (SELECT book_author.book_id AS book_id,
                JSON_AGG(json_build_object('first_name', authors.first_name, 'last_name', authors.last_name, 'cover_image', authors.cover_image, 'bio', authors.bio)) AS authors
            FROM authors
            JOIN book_author
                ON book_author.author_id = authors.id
            WHERE book_author.book_id = $1
            GROUP BY book_author.book_id),
            publishers AS (SELECT book_publisher.book_id  AS book_id,
                JSON_AGG(json_build_object('name', publishers.name, 'address', publishers.address, 'website', publishers.website)) AS publishers
            FROM publishers
            JOIN book_publisher
                ON book_publisher.publisher_id = publishers.id
            WHERE book_publisher.book_id = $1
            GROUP BY book_publisher.book_id),
            tags AS (SELECT book_tag.book_id  AS book_id,
                JSON_AGG(json_build_object('name', tags.name, 'type', tags.type)) AS tags
            FROM tags
            JOIN book_tag
                ON book_tag.tag_id = tags.id
            WHERE book_tag.book_id = $1
            GROUP BY book_tag.book_id),
            categories AS (SELECT book_category.book_id  AS book_id,
                JSON_AGG(json_build_object('name', categories.name, 'type', categories.type, 'description', categories.description)) AS categories
            FROM categories
            JOIN book_category
                ON book_category.category_id = categories.id
            WHERE book_category.book_id = $1
            GROUP BY book_category.book_id)
            SELECT books.*, 
                authors.authors,
                publishers.publishers,
                tags.tags,
                categories.categories
            FROM books
            JOIN authors
                ON authors.book_id = books.id
            JOIN publishers
                ON publishers.book_id = books.id
            JOIN tags
                ON tags.book_id = books.id
            JOIN categories
                ON categories.book_id = books.id
            WHERE books.id = $1
        `
        const values = [id]
        
        const queryResponse = await pool.query(query, values)

        return queryResponse.rows[0]
    }

    async getBooksModel () {
        const query = `
            WITH authors AS (SELECT book_author.book_id AS book_id,
                JSON_AGG(json_build_object('first_name', authors.first_name, 'last_name', authors.last_name, 'cover_image', authors.cover_image, 'bio', authors.bio)) AS authors
            FROM authors
            JOIN book_author
                ON book_author.author_id = authors.id
            GROUP BY book_author.book_id),
            publishers AS (SELECT book_publisher.book_id  AS book_id,
                JSON_AGG(json_build_object('name', publishers.name, 'address', publishers.address, 'website', publishers.website)) AS publishers
            FROM publishers
            JOIN book_publisher
                ON book_publisher.publisher_id = publishers.id
            GROUP BY book_publisher.book_id),
            tags AS (SELECT book_tag.book_id  AS book_id,
                JSON_AGG(json_build_object('name', tags.name, 'type', tags.type)) AS tags
            FROM tags
            JOIN book_tag
                ON book_tag.tag_id = tags.id
            GROUP BY book_tag.book_id),
            categories AS (SELECT book_category.book_id  AS book_id,
                JSON_AGG(json_build_object('name', categories.name, 'type', categories.type, 'description', categories.description)) AS categories
            FROM categories
            JOIN book_category
                ON book_category.category_id = categories.id
            GROUP BY book_category.book_id)
            SELECT books.*, 
                authors.authors,
                publishers.publishers,
                tags.tags,
                categories.categories
            FROM books
            JOIN authors
                ON authors.book_id = books.id
            JOIN publishers
                ON publishers.book_id = books.id
            JOIN tags
                ON tags.book_id = books.id
            JOIN categories
                ON categories.book_id = books.id
        `
        
        const queryResponse = await pool.query(query)

        return queryResponse.rows
    }

    async createBookModel ({
        book: {
            id: bookId,
            title,
            isbn_10,
            isbn_13,
            pages,
            language,
            coverImage,
            publicationDate,
            summary,
            updatedAt: bookUpdatedAt
        },
        author: {
            id: authorId,
            firstName,
            lastName,
            coverImage: authorsCoverImage,
            bio,
            updatedAt: authorUpdatedAt
        },
        publisher: {
            id: publisherId,
            name: publisherName,
            address,
            website,
            updatedAt: publisherUpdatedAt
        },
        tag: {
            id: tagId,
            name: tagName,
            type: tagType
        },
        category: {
            id: categoryId,
            name: categoryName,
            type: categoryType,
            description
        },

    }) {
        const client = await pool.connect()
        try {
            client.query('BEGIN')
            
            const bookQuery = `
                INSERT INTO books
                (id, title, isbn_10, isbn_13, pages, language, cover_image, publication_date, summary, updated_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                RETURNING *
            `
            const bookValues = [
                bookId,
                title,
                isbn_10,
                isbn_13,
                pages,
                language,
                coverImage,
                publicationDate,
                summary,
                bookUpdatedAt,
            ]

            const booksQueryResponse = await client.query(bookQuery, bookValues)

            const authorQuery = `
                    INSERT INTO authors
                    (id, first_name, last_name, cover_image, bio, updated_at)
                    VALUES ($1, $2, $3, $4, $5, $6)
                    RETURNING *
                `
            const authorValues = [
                authorId,
                firstName,
                lastName,
                authorsCoverImage, // Test refer authors.coverImage
                bio,
                authorUpdatedAt
            ]

            const authorQueryResponse = await client.query(authorQuery, authorValues)

            const publisherQuery = `
                    INSERT INTO publisher
                    (id, name, address, website, updated_at)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING *
                `
            const publisherValues = [
                publisherId,
                publisherName,
                address,
                website,
                publisherUpdatedAt
            ]

            const publisherQueryResponse = await client.query(publisherQuery, publisherValues)

            const tagQuery = `
                    INSERT INTO tags
                    (id, name, type)
                    VALUES ($1, $2, $3)
                    RETURNING *
                `
            const tagValues = [
                tagId,
                tagName,
                tagType
            ]

            const tagQueryResponse = await client.query(tagQuery, tagValues)

            const categoryQuery = `
                    INSERT INTO tags
                    (id, name, type, description)
                    VALUES ($1, $2, $3, $4)
                    RETURNING *
                `
            const categoryValues = [
                categoryId,
                categoryName,
                categoryType,
                description
            ]

            const categoryQueryResponse = await client.query(categoryQuery, categoryValues)

            const bookAuthorQuery = `
                    INSERT INTO book_author
                    (book_id, author_id)
                    VALUES ($1, $2)
                    RETURNING *
                `
            const bookAuthorValues = [
                bookId,
                authorId
            ]

            const bookAuthorQueryResponse = await client.query(bookAuthorQuery, bookAuthorValues)
            
            const bookPublisherQuery = `
                    INSERT INTO book_publisher
                    (book_id, publisher_id)
                    VALUES ($1, $2)
                    RETURNING *
                `
            const bookPublisherValues = [
                bookId,
                publisherId
            ]

            const bookTagQueryResponse = await client.query(bookPublisherQuery, bookPublisherValues)

            const bookTagQuery = `
                    INSERT INTO book_tag
                    (book_id, tag_id)
                    VALUES ($1, $2)
                    RETURNING *
                `
            const bookTagValues = [
                bookId,
                tagId
            ]

            const bookPublisherQueryResponse = await client.query(bookTagQuery, bookTagValues)

            const bookCategoryQuery = `
                    INSERT INTO book_category
                    (book_id, tag_id)
                    VALUES ($1, $2)
                    RETURNING *
                `
            const bookCategoryValues = [
                bookId,
                categoryId
            ]

            const bookCategoryQueryResponse = await client.query(bookCategoryQuery, bookCategoryValues)

            client.query('COMMIT')
        }
        catch(err) {
            client.query('ROLLBACK')
        }
        finally {
            client.release()
        }
    }

    async updateBookModel ({
        book: {
            id: bookId,
            title,
            isbn_10,
            isbn_13,
            pages,
            language,
            coverImage,
            publicationDate,
            summary,
            updatedAt: bookUpdatedAt
        },
        author: {
            id: authorId,
            firstName,
            lastName,
            coverImage: authorsCoverImage,
            bio,
            updatedAt: authorUpdatedAt
        },
        publisher: {
            id: publisherId,
            name: publisherName,
            address,
            website,
            updatedAt: publisherUpdatedAt
        },
        tag: {
            id: tagId,
            name: tagName,
            type: tagType
        },
        category: {
            id: categoryId,
            name: categoryName,
            type: categoryType,
            description
        },

    }) {
        const client = await pool.connect()
        try {
            client.query('BEGIN')

            const bookQuery = `
                UPDATE books
                    SET title = $2,
                    SET isbn_10 = $3,
                    SET isbn_13 = $4,
                    SET pages = $5,
                    SET language = $6,
                    SET coverImage = $7,
                    SET publication_date = $8,
                    SET summary = $9,
                    SET updated_at = $10
                WHERE id = $1
            `
            const bookValues = [
                bookId,
                title,
                isbn_10,
                isbn_13,
                pages,
                language,
                coverImage,
                publicationDate,
                summary,
                bookUpdatedAt,
            ]

            const booksQueryResponse = await client.query(bookQuery, bookValues)

            const authorQuery = `
                UPDATE authors
                    SET firstName = $2,
                    SET lastName = $3,
                    SET coverImage = $4,
                    SET bio = $5,
                    SET updated_at = $6
                WHERE id = $1
            `
            const authorValues = [
                authorId,
                firstName,
                lastName,
                authorsCoverImage, 
                bio,
                authorUpdatedAt
            ]

            const authorQueryResponse = await client.query(authorQuery, authorValues)

            const publisherQuery = `
                    UPDATE publisher
                        SET name = $2, 
                        SET address = $3, 
                        SET website = $4, 
                        SET updated_at = $5
                    WHERE id = $1
                `
            const publisherValues = [
                publisherId,
                publisherName,
                address,
                website,
                publisherUpdatedAt
            ]

            const publisherQueryResponse = await client.query(publisherQuery, publisherValues)

            const tagQuery = `
                    UPDATE tags
                        SET name = $2, 
                        SET type = $3
                    WHERE id = $1
                `
            const tagValues = [
                tagId,
                tagName,
                tagType
            ]

            const tagQueryResponse = await client.query(tagQuery, tagValues)

            const categoryQuery = `
                    UPDATE tags
                        SET name = $2, 
                        SET type = $3, 
                        SET description = $4
                    WHERE id = $1
                `
            const categoryValues = [
                categoryId,
                categoryName,
                categoryType,
                description
            ]

            const categoryQueryResponse = await client.query(categoryQuery, categoryValues)

            client.query('COMMIT')
        }
        catch(err) {
            client.query('ROLLBACK')
        }
        finally {
            client.release()
        }
    }

    async deleteBookService ({
        book: {
            id: bookId,
        },
        author: {
            id: authorId,
        },
        publisher: {
            id: publisherId,
        },
        tag: {
            id: tagId,
        },
        category: {
            id: categoryId,
        },

    }) {
        const client = await pool.connect()
        try {
            client.query('BEGIN')

            const bookQuery = `
                DELETE FROM books
                WHERE id = $1
            `
            const bookValues = [
                bookId,
            ]

            const booksQueryResponse = await client.query(bookQuery, bookValues)

            const authorQuery = `
                    DELETE FROM authors
                    WHERE id = $1
                `
            const authorValues = [
                authorId,
            ]

            const authorQueryResponse = await client.query(authorQuery, authorValues)

            const publisherQuery = `
                    DELETE FROM publisher
                    WHERE id = $1
                `
            const publisherValues = [
                publisherId,
            ]

            const publisherQueryResponse = await client.query(publisherQuery, publisherValues)

            const tagQuery = `
                    DELETE FROM tags
                    WHERE id = $1
                `
            const tagValues = [
                tagId,
                tagName,
                tagType
            ]

            const tagQueryResponse = await client.query(tagQuery, tagValues)

            const categoryQuery = `
                    DELETE FROM tags
                    WHERE id = $1
                `
            const categoryValues = [
                categoryId,
            ]

            const categoryQueryResponse = await client.query(categoryQuery, categoryValues)

            const bookAuthorQuery = `
                    DELETE FROM book_author
                    WHERE book_id = $1 AND author_id = $2
                `
            const bookAuthorValues = [
                bookId,
                authorId
            ]

            const bookAuthorQueryResponse = await client.query(bookAuthorQuery, bookAuthorValues)
            
            const bookPublisherQuery = `
                    DELETE FROM book_publisher
                    WHERE book_id = $1 AND publisher_id = $2
                `
            const bookPublisherValues = [
                bookId,
                publisherId
            ]

            const bookTagQueryResponse = await client.query(bookPublisherQuery, bookPublisherValues)

            const bookTagQuery = `
                    DELETE FROM book_tag
                    WHERE book_id = $1 AND tag_id = $2
                `
            const bookTagValues = [
                bookId,
                tagId
            ]

            const bookPublisherQueryResponse = await client.query(bookTagQuery, bookTagValues)

            const bookCategoryQuery = `
                    DELETE FROM book_category
                    WHERE book_id = $1 AND tag_id = $2
                `
            const bookCategoryValues = [
                bookId,
                categoryId
            ]

            const bookCategoryQueryResponse = await client.query(bookCategoryQuery, bookCategoryValues)

            client.query('COMMIT')
        }
        catch(err) {
            client.query('ROLLBACK')
        }
        finally {
            client.release()
        }
    }
}

export { BookModels }