import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import type { Comment } from '../types'
import { Env } from '..'

export const commentsApi = new Hono<{ Bindings: Env }>()

commentsApi.get('/dashboard', async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT * FROM comments;`
  ).all<Comment>()
  return c.json(results)
})

commentsApi.get('/:slug', async (c) => {
  const slug = c.req.param('slug')
  const sql = `SELECT id,content,created_at,likes FROM comments WHERE post_slug = ? AND is_approved = 1;`
  const { results } = await c.env.DB.prepare(sql).bind(slug).all<Comment>()
  return c.json(results)
})

const postComments = z.object({
  slug: z.string(),
  content: z.string().min(1).max(400),
  user_id: z.string().uuid(),
})

commentsApi.post(
  '/add',
  zValidator('json', postComments, (res, c) => {
    if (!res.success) {
      return c.json({ message: res }, 400)
    }
  }),
  async (c) => {
    const { slug, content, user_id } = c.req.valid('json')
    const { success } = await c.env.DB.prepare(
      `INSERT INTO comments(post_slug, content, user_id) VALUES(?, ?, ?);`
    )
      .bind(slug, content, user_id)
      .run()
    if (success) {
      return c.json('Created', 201)
    } else {
      return c.json('Something went wrong', 500)
    }
  }
)

const postApprove = z.object({
  id: z.number(),
  approve: z.number(),
})

commentsApi.post(
  '/approve',
  zValidator('json', postApprove, (res, c) => {
    if (!res.success) {
      return c.json({ message: res }, 400)
    }
  }),
  async (c) => {
    const { id, approve } = c.req.valid('json')
    const { success } = await c.env.DB.prepare(
      `UPDATE comments SET is_approved = ? WHERE id = ?`
    )
      .bind(approve, id)
      .run()
    if (success) {
      return c.json('Updated', 201)
    } else {
      return c.json('Something went wrong', 500)
    }
  }
)
