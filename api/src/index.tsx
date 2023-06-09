import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
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
  return c.json(results)
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
        return c.json({ message: 'body invalid' }, 400)
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
    return c.json({ message: 'success' }, 200)
  }
)

app.get('/hello', (c) => c.json('Hello!'))

export default app
