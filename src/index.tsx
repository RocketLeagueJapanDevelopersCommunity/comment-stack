import { Hono } from 'hono'
import { jsx } from 'hono/jsx'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { Top } from './components'
import type { Comment } from './types'

type Env = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Env }>()

// TODO: /:slug
app.get('/', async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT id,post_slug,content,created_at,updated_at,likes,author_uuid FROM comments;`
  ).all<Comment>()
  const posts = results
  return c.html(<Top posts={posts} />)
})

app.post(
  '/post',
  zValidator(
    'form',
    z.object({
      body: z.string().min(1).max(400),
    }),
    (res, c) => {
      if (!res.success) {
        return c.redirect('/')
      }
    }
  ),
  async (c) => {
    const { body } = c.req.valid('form')
    await c.env.DB.prepare(
      `INSERT INTO comments(post_slug, content, author_uuid) VALUES(?, ?, ?);`
    )
      .bind('rljapan-site-1', body, 'uuidv4')
      .run()
    return c.redirect('/')
  }
)

app.get('/hello', (c) => c.text('Hello!'))

export default app
