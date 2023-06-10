import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import type { Comment } from '../types'
import { Env } from '..'

export const commentsApi = new Hono<{ Bindings: Env }>()

// TODO: /:slug
commentsApi.get('/comments', async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT id,post_slug,content,created_at,updated_at,likes,author_uuid FROM comments;`
  ).all<Comment>()
  return c.json(results)
})

const postComments = z.object({
  slug: z.string(),
  content: z.string().min(1).max(400),
  uuid: z.string().uuid(),
})

commentsApi.post(
  '/comment',
  zValidator('json', postComments, (res, c) => {
    if (!res.success) {
      return c.json({ message: res }, 400)
    }
  }),
  async (c) => {
    const { slug, content, uuid } = c.req.valid('json')
    await c.env.DB.prepare(
      `INSERT INTO comments(post_slug, content, author_uuid) VALUES(?, ?, ?);`
    )
      .bind(slug, content, uuid)
      .run()
    return c.json({ message: 'success' }, 200)
  }
)
