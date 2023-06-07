DROP TABLE IF EXISTS comments;

CREATE TABLE comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_slug TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  likes INTEGER DEFAULT 0,
  author_uuid TEXT
);

CREATE INDEX idx_comments_post_slug ON comments(post_slug);

CREATE INDEX idx_comments_author_uuid ON comments(author_uuid);

-- Optionally, uncomment the below query to create data
-- INSERT INTO
--   COMMENTS (post_slug, content, author_uuid)
-- VALUES
--   (
--     'rljapan-site-1',
--     'test1',
--     '123e79fb-7e05-47d2-89f8-c9b328d50ec5'
--   );
-- show all comments;
-- SELECT
--   *
-- FROM
--   comments;