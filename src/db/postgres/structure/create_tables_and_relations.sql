CREATE TABLE "books" (
  "id" VARCHAR(26) PRIMARY KEY,
  "title" TEXT NOT NULL,
  "isbn_10" VARCHAR(15) UNIQUE,
  "isbn_13" VARCHAR(20) UNIQUE,
  "pages" INTEGER NOT NULL,
  "language" VARCHAR(255) NOT NULL,
  "cover_image" TEXT,
  "publication_date" DATE NOT NULL,
  "summary" TEXT, 
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "authors" (
  "id" VARCHAR(26) PRIMARY KEY,
  "first_name" VARCHAR(100) NOT NULL,
  "last_name" VARCHAR(100) NOT NULL,
  "cover_image" TEXT,
  "bio" TEXT,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "publishers" (
  "id" VARCHAR(26) PRIMARY KEY,
  "name" VARCHAR(100) NOT NULL,
  "address" VARCHAR(255),
  "website" TEXT,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "tags" (
  "id" VARCHAR(26) PRIMARY KEY,
  "name" VARCHAR(50) UNIQUE NOT NULL,
  "type" VARCHAR(50) NOT NULL
);

CREATE TABLE "categories" (
  "id" VARCHAR(26) PRIMARY KEY,
  "name" VARCHAR(50) UNIQUE NOT NULL,
  "type" VARCHAR(50) NOT NULL,
  "description" TEXT
);

CREATE TABLE "book_publisher" (
  "book_id" VARCHAR(26) NOT NULL,
  "publisher_id" VARCHAR(26) NOT NULL,
  UNIQUE(book_id, publisher_id)
);

CREATE TABLE "book_author" (
  "book_id" VARCHAR(26) NOT NULL,
  "author_id" VARCHAR(26) NOT NULL,
  UNIQUE (book_id, author_id)
);

CREATE TABLE "book_tag" (
  "book_id" VARCHAR(26) NOT NULL,
  "tag_id" VARCHAR(26) NOT NULL,
  UNIQUE (book_id, tag_id)
);

CREATE TABLE "book_category" (
  "book_id" VARCHAR(26) NOT NULL,
  "category_id" VARCHAR(26) NOT NULL,
  UNIQUE (book_id, category_id)
);
--
CREATE TABLE "ratings" (
  "id" VARCHAR(26) PRIMARY KEY,
  "rating" INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  "privacy" BOOL DEFAULT false
);

CREATE TABLE "book_rate" (
  "rate_id" VARCHAR(26) PRIMARY KEY,
  "book_id" VARCHAR(26) NOT NULL,
  "user_id" VARCHAR(26) NOT NULL,
  UNIQUE (book_id, user_id)
);

CREATE TABLE "notes" (
  "id" VARCHAR(26) PRIMARY KEY,
  "content" TEXT NOT NULL,
  "privacy" BOOL DEFAULT true,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "quotes" (
  "id" VARCHAR(26) PRIMARY KEY,
  "content" VARCHAR(300) NOT NULL,
  "privacy" BOOL DEFAULT true
);

CREATE TABLE "excerpts" (
  "id" VARCHAR(26) PRIMARY KEY,
  "content" VARCHAR(5000) CHECK(LENGTH(content) > 300) NOT NULL,
  "privacy" BOOL DEFAULT true
);

CREATE TABLE "book_note" (
  "note_id" VARCHAR(26) PRIMARY KEY,
  "book_id" VARCHAR(26) NOT NULL,
  "user_id" VARCHAR(26) NOT NULL,
  "book_locale_id" VARCHAR(26),
  UNIQUE (note_id, book_id, user_id, book_locale_id)
);

CREATE TABLE "book_quote" (
  "quote_id" VARCHAR(26) PRIMARY KEY,
  "book_id" VARCHAR(26) NOT NULL,
  "user_id" VARCHAR(26) NOT NULL,
  "book_locale_id" VARCHAR(26) NOT NULL,
  UNIQUE (quote_id, book_id, user_id, book_locale_id)
);

CREATE TABLE "book_excerpt" (
  "excerpt_id" VARCHAR(26) PRIMARY KEY, 
  "book_id" VARCHAR(26) NOT NULL,
  "user_id" VARCHAR(26) NOT NULL,
  "book_locale_id" VARCHAR(26) NOT NULL,
  UNIQUE (excerpt_id, book_id, user_id, book_locale_id)
);

CREATE TABLE "book_locale" (
  "id" VARCHAR(26) PRIMARY KEY,
  "page" INT4RANGE NOT NULL,
  "paragraph_number" INT4RANGE,
  "chapter_number" INT4RANGE,
  "word_offset" INT4RANGE,
  "location_indentifier" JSON -- location_identifier
);

CREATE TABLE "bookmark" (
  "id" VARCHAR(26) PRIMARY KEY,
  "book_id" VARCHAR(26) NOT NULL,
  "user_id" VARCHAR(26) NOT NULL,
  "book_locale_id" VARCHAR(26) NOT NULL,
  "privacy" BOOL DEFAULT true
);

CREATE TABLE "book_user" (
  "book_id" VARCHAR(26) NOT NULL,
  "user_id" VARCHAR(26) NOT NULL,
  UNIQUE (book_id, user_id)
);

CREATE TABLE "users" (
  "id" VARCHAR(26) PRIMARY KEY,
  "nickname" VARCHAR(100) NOT NULL,
  "cover_image" TEXT,
  "description" VARCHAR(280),
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "follows" (
  "id" VARCHAR(26) PRIMARY KEY,
  "following_id" VARCHAR(26) NOT NULL,
  "followed_id" VARCHAR(26) NOT NULL,
  UNIQUE (following_id, followed_id)
);

CREATE TABLE "read_later" (
  "id" VARCHAR(26) PRIMARY KEY,
  "book_id" VARCHAR(26) NOT NULL,
  "user_id" VARCHAR(26) NOT NULL,
  "privacy" BOOL DEFAULT false,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "lists" (
  "id" VARCHAR(26) PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL,
  "description" VARCHAR(280),
  "privacy" BOOL DEFAULT false,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "user_lists" (
  "user_id" VARCHAR(26) NOT NULL,
  "list_id" VARCHAR(26) PRIMARY KEY,
  UNIQUE (user_id, list_id)
);

CREATE TABLE "list_books" (
  "list_id" VARCHAR(26) NOT NULL,
  "book_id" VARCHAR(26) NOT NULL,
  UNIQUE (list_id, book_id)
);

CREATE TABLE "likes_list" (
  "user_id" VARCHAR(26) NOT NULL,
  "list_id" VARCHAR(26) NOT NULL,
  UNIQUE (user_id, list_id)
);

CREATE TABLE "list_followed" (
  "user_id" VARCHAR(26) NOT NULL,
  "list_id" VARCHAR(26) NOT NULL,
  UNIQUE (user_id, list_id)
);

CREATE TABLE "reading_progress" (
  "id" VARCHAR(26) PRIMARY KEY,
  "book_id" VARCHAR(26) NOT NULL,
  "user_id" VARCHAR(26) NOT NULL,
  "book_locale_id" VARCHAR(26) NOT NULL,
  "privacy" BOOL DEFAULT false,
  "last_reading" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "started" BOOL DEFAULT false,
  "finished" BOOL DEFAULT false
);

CREATE TABLE "goals" (
  "id" VARCHAR(26) PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "description" TEXT,
  "duration" INTERVAL,
  "start_time" TIME,
  "end_date" DATE,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "frequencies" (
  "id" VARCHAR(26) PRIMARY KEY,
  "frequency_options_id" INT NOT NULL,
  "marker" JSON
);

CREATE TABLE "frequency_options" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" VARCHAR(20) NOT NULL
);

CREATE TABLE "frequency_goal" (
  "frequency_id" VARCHAR(26) NOT NULL,
  "goal_id" VARCHAR(26) NOT NULL,
  UNIQUE (frequency_id, goal_id)
);

CREATE TABLE "user_goal" (
  "user_id" VARCHAR(26) NOT NULL,
  "goal_id" VARCHAR(26) PRIMARY KEY,
  UNIQUE (user_id, goal_id)
);

CREATE TABLE "goal_book" (
  "book_id" VARCHAR(26) NOT NULL,
  "goal_id" VARCHAR(26) PRIMARY KEY,
  UNIQUE (book_id, goal_id)
);

CREATE TABLE "goal_reminder" (
  "goal_id" VARCHAR(26) PRIMARY KEY,
  "remind_id" VARCHAR(26) NOT NULL,
  UNIQUE (goal_id, remind_id)
);

CREATE TABLE "reminders" (
  "id" VARCHAR(26) PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "description" TEXT,
  "reminder_datetime" TIMESTAMP NOT NULL,
  "is_active" BOOL  DEFAULT true,
  "is_sent" BOOL  DEFAULT false,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "user_reminder" (
  "user_id" VARCHAR(26) NOT NULL,
  "remind_id" VARCHAR(26) PRIMARY KEY,
  UNIQUE (user_id, remind_id)
);

ALTER TABLE "book_publisher" ADD FOREIGN KEY ("book_id") REFERENCES "books" ("id");

ALTER TABLE "book_author" ADD FOREIGN KEY ("book_id") REFERENCES "books" ("id");

ALTER TABLE "book_tag" ADD FOREIGN KEY ("book_id") REFERENCES "books" ("id");

ALTER TABLE "book_category" ADD FOREIGN KEY ("book_id") REFERENCES "books" ("id");

ALTER TABLE "book_rate" ADD FOREIGN KEY ("book_id") REFERENCES "books" ("id");

ALTER TABLE "book_note" ADD FOREIGN KEY ("book_id") REFERENCES "books" ("id");

ALTER TABLE "book_quote" ADD FOREIGN KEY ("book_id") REFERENCES "books" ("id");

ALTER TABLE "book_excerpt" ADD FOREIGN KEY ("book_id") REFERENCES "books" ("id");

ALTER TABLE "bookmark" ADD FOREIGN KEY ("book_id") REFERENCES "books" ("id");

ALTER TABLE "read_later" ADD FOREIGN KEY ("book_id") REFERENCES "books" ("id");

ALTER TABLE "list_books" ADD FOREIGN KEY ("book_id") REFERENCES "books" ("id");

ALTER TABLE "book_user" ADD FOREIGN KEY ("book_id") REFERENCES "books" ("id");

ALTER TABLE "reading_progress" ADD FOREIGN KEY ("book_id") REFERENCES "books" ("id");

ALTER TABLE "goal_book" ADD FOREIGN KEY ("book_id") REFERENCES "books" ("id");

ALTER TABLE "book_author" ADD FOREIGN KEY ("author_id") REFERENCES "authors" ("id");

ALTER TABLE "book_publisher" ADD FOREIGN KEY ("publisher_id") REFERENCES "publishers" ("id");

ALTER TABLE "book_tag" ADD FOREIGN KEY ("tag_id") REFERENCES "tags" ("id");

ALTER TABLE "book_category" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "book_rate" ADD FOREIGN KEY ("rate_id") REFERENCES "ratings" ("id");

ALTER TABLE "book_note" ADD FOREIGN KEY ("note_id") REFERENCES "notes" ("id");

ALTER TABLE "book_quote" ADD FOREIGN KEY ("quote_id") REFERENCES "quotes" ("id");

ALTER TABLE "book_excerpt" ADD FOREIGN KEY ("excerpt_id") REFERENCES "excerpts" ("id");

ALTER TABLE "book_excerpt" ADD FOREIGN KEY ("book_locale_id") REFERENCES "book_locale" ("id");

ALTER TABLE "book_quote" ADD FOREIGN KEY ("book_locale_id") REFERENCES "book_locale" ("id");

ALTER TABLE "book_note" ADD FOREIGN KEY ("book_locale_id") REFERENCES "book_locale" ("id");

ALTER TABLE "bookmark" ADD FOREIGN KEY ("book_locale_id") REFERENCES "book_locale" ("id");

ALTER TABLE "reading_progress" ADD FOREIGN KEY ("book_locale_id") REFERENCES "book_locale" ("id");

ALTER TABLE "follows" ADD FOREIGN KEY ("following_id") REFERENCES "users" ("id");

ALTER TABLE "follows" ADD FOREIGN KEY ("followed_id") REFERENCES "users" ("id");

ALTER TABLE "read_later" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "likes_list" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "list_followed" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "book_user" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "book_note" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "book_quote" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "book_excerpt" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "bookmark" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "reading_progress" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_lists" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_goal" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_reminder" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "book_rate" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "list_books" ADD FOREIGN KEY ("list_id") REFERENCES "lists" ("id");

ALTER TABLE "likes_list" ADD FOREIGN KEY ("list_id") REFERENCES "lists" ("id");

ALTER TABLE "list_followed" ADD FOREIGN KEY ("list_id") REFERENCES "lists" ("id");

ALTER TABLE "user_lists" ADD FOREIGN KEY ("list_id") REFERENCES "lists" ("id");

ALTER TABLE "goal_book" ADD FOREIGN KEY ("goal_id") REFERENCES "goals" ("id");

ALTER TABLE "goal_reminder" ADD FOREIGN KEY ("goal_id") REFERENCES "goals" ("id");

ALTER TABLE "user_goal" ADD FOREIGN KEY ("goal_id") REFERENCES "goals" ("id");

ALTER TABLE "frequency_goal" ADD FOREIGN KEY ("goal_id") REFERENCES "goals" ("id");

ALTER TABLE "frequency_goal" ADD FOREIGN KEY ("frequency_id") REFERENCES "frequencies" ("id");

ALTER TABLE "frequencies" ADD FOREIGN KEY ("frequency_options_id") REFERENCES "frequency_options" ("id");

ALTER TABLE "goal_reminder" ADD FOREIGN KEY ("remind_id") REFERENCES "reminders" ("id");

ALTER TABLE "user_reminder" ADD FOREIGN KEY ("remind_id") REFERENCES "reminders" ("id");
