import { ulid } from 'ulid'
import dayjs from "dayjs"

class BookServices {
    async getBookService ({ id }, bookModels) {
        let queryResponse = null

        if (id) {
            queryResponse = await bookModels.getBookModel({ id })
        } else {
            queryResponse = await bookModels.getBooksModel()
        }

        const queryCount = {
            count: queryResponse.length
        }

        return {
            queryResponse, 
            queryCount
        }
    }

    async createBookService({ items }, bookModels) {
        items.authors.forEach((author, index) => {
            items.authors[index] = {
                authorId: ulid(),
                authorUpdatedAt: dayjs().format("YYYY-MM-DD[T]HH:mm:ss"),
                ...author
            } 
        })

        items.publishers.forEach((publisher, index) => {
            items.publishers[index] = {
                publisherId: ulid(),
                publisherUpdatedAt: dayjs().format("YYYY-MM-DD[T]HH:mm:ss"),
                ...publisher
            } 
        })

        items.tags.forEach((tag, index) => {
            items.tags[index] = {
                id: ulid(),
                ...tag
            } 
        })

        items.categories.forEach((category, index) => {
            items.categories[index] = {
                id: ulid(),
                ...category
            } 
        })

        items.bookId = ulid()
        items.bookUpdatedAt = dayjs().format("YYYY-MM-DD[T]HH:mm:ss")

        const createBookModel = await bookModels.createBookModel(items)

        return {
            ...createBookModel
        }
    }

    async updateBookService({ id, items }, bookModels) {
        const book = {}
        book.id = id

        for(const item in items) {
            if(item != "authors" ||
                item != "publishers" ||
                item != "tags" ||
                item != "categories"
            ) {
                book.item = items[item]
                if(!("updatedAt" in book)) {
                    book.updated_at = dayjs().format("YYYY-MM-DD[T]HH:mm:ss")
                }
            }
        }

        items.authors.length && items.authors.forEach((author, index) => {
            items.authors[index] = {
                updated_at: dayjs().format("YYYY-MM-DD[T]HH:mm:ss"),
                ...author
            } 
        })

        items.publishers.length && items.publishers.forEach((publisher, index) => {
            items.publishers[index] = {
                updated_at: dayjs().format("YYYY-MM-DD[T]HH:mm:ss"),
                ...publisher
            } 
        })

        const updateBookModel = await bookModels.updateBookModel(book, items)

        return {
            ...updateBookModel
        }
    }

    async deleteBookService ({ id }, bookModels) {
        const deleteBookModel = await bookModels.deleteBookModel({ id })

        return {
            ...deleteBookModel
        }
    }
}

export { BookServices }