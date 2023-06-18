DROP TABLE IF EXISTS Comments;

CREATE TABLE Comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_slug TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  likes INTEGER DEFAULT 0,
  user_id TEXT NOT NULL,
  is_approved INTEGER DEFAULT 0
);

CREATE INDEX idx_comments_post_slug ON Comments(post_slug);

-- Optionally, uncomment the below query to create data
-- INSERT INTO
--   COMMENTS (post_slug, content, user_id)
-- VALUES
--   (
--     'rljapan-site-1',
--     'test1',
--     '0899e095-d1d6-4a89-a6ff-387e0292e9f9'
--   );
-- show all comments;
-- SELECT
--   *
-- FROM
--   comments;