DROP TABLE IF EXISTS comments;

CREATE TABLE comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_slug TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  likes INTEGER DEFAULT 0,
  email TEXT NOT NULL,
  is_approved INTEGER DEFAULT 0
);

CREATE INDEX idx_comments_post_slug ON comments(post_slug);

-- Optionally, uncomment the below query to create data
INSERT INTO
  COMMENTS (post_slug, content, email)
VALUES
  (
    'rljapan-site-1',
    'test1',
    'a@a.com'
  );

-- show all comments;
SELECT
  *
FROM
  comments;