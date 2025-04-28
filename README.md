# BookAPI

BookAPI is a RESTful API designed for managing books and their associated data, including authors, publishers, tags, categories, metadata, ratings, notes, quotes, excerpts, bookmarks, and more. It also includes social features such as user interactions, reading progress tracking, and goal management.

## Features

- **Book Management**: Manage books, authors, publishers, tags, and categories.
- **User Interactions**: Handle user-specific data like notes, quotes, excerpts, bookmarks, and reading progress.
- **Social Features**: Support for likes, follows, and reading goals.
- **Unit Testing**: Comprehensive unit tests using Vitest.

## Project Structure

```
src/
├── controllers/       # Controllers for handling API requests
├── db/                # Database-related files (in-memory and database-backed)
│   ├── postgres/      # PostgreSQL database scripts and configurations
├── models/            # Models for interacting with the database
├── services/          # Business logic and service layer
tests/
├── unit/              # Unit tests for services and models
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gabrielsrs/bookAPI.git
   cd bookAPI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   - For PostgreSQL, configure the database connection in `src/db/index.js` and run the SQL scripts in `src/db/postgres`.

4. Run the application:
   ```bash
   npm start
   ```

## Testing

Run unit tests using Vitest:
```bash
npm test
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.