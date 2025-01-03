import { pool } from "../../db/index.js"

class BookModels {
    async __selectData(items, table) {
        const filtered = []
        for(const item of items) {
            const query = `
                SELECT *
                FROM ${table}
                WHERE name = '${item.name}'
            `

            const queryResponse = await pool.query(query)

            if(queryResponse.rowCount) {
                filtered.push(queryResponse.rows[0])
            } else {
                filtered.push(item)
            }
        }
        
        return filtered
    }

    async getBookModel ({ bookId }) {
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
        const values = [bookId]
        
        const queryResponse = await pool.query(query, values)

        return {
            book: queryResponse.rows[0]
        }
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

        return {
            books: queryResponse.rows
        }
    }

    async createBookModel ({
        bookId,
        title,
        isbn_10,
        isbn_13,
        pages,
        language,
        cover_image: coverImage,
        publication_date: publicationDate,
        summary,
        bookUpdatedAt,
        authors,
        publishers,
        tags,
        categories,

    }) {
        const client = await pool.connect()
        try {
            let authorsQueryResponse;
            let publishersQueryResponse;
            let tagsQueryResponse;
            let categoriesQueryResponse;

            await client.query('BEGIN')
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

                if (authors.length) {
                    const authorQuery = `
                        INSERT INTO authors
                        (id, first_name, last_name, cover_image, bio, updated_at)
                        VALUES
                        ${authors.map(author => {
                            return `('${author.authorId}', '${author.first_name}', '${author.last_name}', '${author.cover_image}', '${author.bio}', '${author.authorUpdatedAt}')`
                        })}
                        RETURNING *
                    `

                    authorsQueryResponse = await client.query(authorQuery)
                    
                    const bookAuthorQuery = `
                        INSERT INTO book_author
                        (book_id, author_id)
                        VALUES
                        ${authors.map(author => {
                            return `('${bookId}', '${author.authorId}')`
                        })}
                        RETURNING *
                    `

                    await client.query(bookAuthorQuery)
                }
                
                if (publishers.length) {
                    const publisherQuery = `
                        INSERT INTO publishers
                        (id, name, address, website, updated_at)
                        VALUES
                        ${publishers.map(publisher => {
                            return `('${publisher.publisherId}', '${publisher.name}', '${publisher.address}', '${publisher.website}', '${publisher.publisherUpdatedAt}')`
                        })}
                        RETURNING *
                    `

                    publishersQueryResponse = await client.query(publisherQuery)

                    const bookPublisherQuery = `
                        INSERT INTO book_publisher
                        (book_id, publisher_id)
                        VALUES
                        ${publishers.map(publisher => {
                            return `('${bookId}', '${publisher.publisherId}')`
                        })}
                        RETURNING *
                    `

                    await client.query(bookPublisherQuery)
                }

                if (tags.length) {
                    const filteredTags = await this.__selectData(tags, "tags")
                    
                    const tagQuery = `
                        INSERT INTO tags
                        (id, name, type)
                        VALUES
                        ${filteredTags.map((tag, index) => {
                            if(tag.tagId == tags[index].id) {
                                return `('${tag.tagId}', '${tag.name}', '${tag.type}')`
                            }
                        }).filter(Boolean).join(',')}
                        RETURNING *
                    `

                    tagsQueryResponse = await client.query(tagQuery)
                    

                    const bookTagQuery = `
                        INSERT INTO book_tag
                        (book_id, tag_id)
                        VALUES
                        ${filteredTags.map(tag => {
                            return `('${bookId}', '${tag.tagId}')`
                        })}
                        RETURNING *
                    `

                    await client.query(bookTagQuery)
                }

                if (categories.length) {
                    const filteredCategories = await this.__selectData(categories, "categories")

                    const categoryQuery = `
                        INSERT INTO categories
                        (id, name, type, description)
                        VALUES
                        ${filteredCategories.map((category, index) => {
                            if(category.categoryId == categories[index].id) {
                                return `('${category.categoryId}', '${category.name}', '${category.type}', '${category.description}')`
                            }
                        }).filter(Boolean).join(',')}
                        RETURNING *
                    `

                    categoriesQueryResponse = await client.query(categoryQuery)

                    const bookCategoryQuery = `
                        INSERT INTO book_category
                        (book_id, category_id)
                        VALUES
                        ${filteredCategories.map(category => {
                            return `('${bookId}', '${category.categoryId}')`
                        })}
                        RETURNING *
                    `

                    await client.query(bookCategoryQuery)
                }

            await client.query('COMMIT')

            return {
                book: booksQueryResponse.rows[0],
                authors: authorsQueryResponse.rows || [],
                publishers: publishersQueryResponse.rows || [],
                tags: tagsQueryResponse.rows || [],
                categories: categoriesQueryResponse.rows || []
            }
        }
        catch(err) {
            console.log(err)
            client.query('ROLLBACK')
        }
        finally {
            client.release()
        }
    }
    
    async updateBookModel ({
        book,
        authors = [],
        publishers = [],
        tags = [],
        categories = []
    }) {
        const client = await pool.connect()
        try {
            let booksQueryResponse;
            let authorsResponse;
            let publishersResponse;
            let tagsResponse;
            let categoriesResponse;

            client.query('BEGIN')
            
            if(Object.keys(book).length) {
                const bookQuery = `
                    UPDATE books
                        SET ${Object.entries(book).map(item => `${item[0]} = ${item[1]}`)}
                    WHERE id = $1
                    RETURNING *
                `

                const bookValues = [book.bookId]

                booksQueryResponse = await client.query(bookQuery, bookValues)
            }

            if(authors.length) {
                for(const author in authors) {
                    const authorQuery = `
                        UPDATE authors
                            SET ${
                                Object.entries(author).filter(item => item[0] != "id")
                                .map(item => `${item[0]} = ${item[1]}`)
                            }
                        WHERE id = $1
                        RETURNING *
                    `

                    const authorValues = [
                        author.authorId,
                    ]

                    const authorQueryResponse = await client.query(authorQuery, authorValues)
                    authorsResponse.push(authorQueryResponse.rows[0])
                }
            }

            if(publishers.length) {
                for(const publisher in publishers) {
                    const publisherQuery = `
                        UPDATE publishers
                            SET ${
                                Object.entries(publisher).filter(item => item[0] != "id")
                                .map(item => `${item[0]} = ${item[1]}`)
                            }
                        WHERE id = $1
                        RETURNING *
                    `

                    const publisherValues = [
                        publisher.publisherId,
                    ]

                    const publisherQueryResponse = await client.query(publisherQuery, publisherValues)
                    publishersResponse.push(publisherQueryResponse.rows[0])
                }
            }

            if(tags.length) {
                for(const tag in tags) {
                    const tagQuery = `
                        UPDATE tags
                            SET ${
                                Object.entries(tag).filter(item => item[0] != "id")
                                .map(item => `${item[0]} = ${item[1]}`)
                            }
                        WHERE id = $1
                        RETURNING *
                    `

                    const tagValues = [
                        tag.tagId,
                    ]

                    const tagQueryResponse = await client.query(tagQuery, tagValues)
                    tagsResponse.push(tagQueryResponse.rows[0])
                }
            }

            if(categories.length) {
                for(const category in categories) {
                    const categoryQuery = `
                        UPDATE categories
                            SET ${
                                Object.entries(category).filter(item => item[0] != "id")
                                .map(item => `${item[0]} = ${item[1]}`)
                            }
                        WHERE id = $1
                        RETURNING *
                    `

                    const categoryValues = [
                        category.categoryId,
                    ]

                    const categoryQueryResponse = await client.query(categoryQuery, categoryValues)
                    categoriesResponse.push(categoryQueryResponse.rows[0])                    
                }
            }

            await client.query('COMMIT')

            const a = 1

            return {
                book: booksQueryResponse || "",
                authors: authorsResponse || [],
                publishers: publishersResponse || [],
                tags: tagsResponse || [],
                categories: categoriesResponse || [],
            }
        }
        catch(err) {
            client.query('ROLLBACK')
        }
        finally {
            client.release()
        }
    }

    async deleteBookModel ({ bookId }) {
        const client = await pool.connect()
        try {
            client.query('BEGIN')

            const bookAuthorQuery = `
                    DELETE FROM book_author
                    WHERE book_id = $1
                    RETURNING author_id
                `
            const bookAuthorValues = [bookId]

            const bookAuthorQueryResponse = await client.query(bookAuthorQuery, bookAuthorValues)
            
            const bookPublisherQuery = `
                    DELETE FROM book_publisher
                    WHERE book_id = $1
                    RETURNING publisher_id
                `
            const bookPublisherValues = [bookId]

            const bookPublisherResponse = await client.query(bookPublisherQuery, bookPublisherValues)

            const authorQuery = `
                    DELETE FROM authors
                    WHERE${bookAuthorQueryResponse.rows.map(authorId => ` id = ${authorId} `).replace(",", "OR")}
                    RETURNING id
                `

            const authorQueryResponse = await client.query(authorQuery)

            const publisherQuery = `
                    DELETE FROM publisher
                    WHERE${bookPublisherResponse.rows.map(publisherId => ` id = ${publisherId} `).replace(",", "OR")}
                    RETURNING id
                `

            const publisherQueryResponse = await client.query(publisherQuery)

            const bookQuery = `
                DELETE FROM books
                WHERE id = $1
                RETURNING id
            `
            const bookValues = [bookId]

            const booksQueryResponse = await client.query(bookQuery, bookValues)

            await client.query('COMMIT')

            return {
                book: booksQueryResponse,
                authors: authorQueryResponse,
                bookAuthor: bookAuthorQueryResponse,
                publishers: publisherQueryResponse,
                bookPublisher: bookPublisherResponse,
            }
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