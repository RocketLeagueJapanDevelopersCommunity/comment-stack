import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import type { Comment } from '../types'
import { Env } from '..'

export const commentsApi = new Hono<{ Bindings: Env }>()

// TODO: 全ての情報を見れるAPIはemailで制限をかける
commentsApi.get('', async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT id,post_slug,content,created_at,likes,email,is_approved FROM comments;`
  ).all<Comment>()
  return c.json(results)
})

commentsApi.get('/:slug', async (c) => {
  const slug = c.req.param('slug')
  const prdsql = `SELECT id,content,created_at,likes FROM comments WHERE post_slug = ? AND is_approved = 1;`
  const sql = `SELECT id,post_slug,content,created_at,likes,email,is_approved FROM comments WHERE post_slug = ?;`
  const { results } = await c.env.DB.prepare(sql).bind(slug).all<Comment>()
  return c.json(results)
})

const postComments = z.object({
  slug: z.string(),
  content: z.string().min(1).max(400),
  email: z.string().email(),
})

commentsApi.post(
  '/add',
  zValidator('json', postComments, (res, c) => {
    if (!res.success) {
      return c.json({ message: res }, 400)
    }
  }),
  async (c) => {
    const { slug, content, email } = c.req.valid('json')
    const { success } = await c.env.DB.prepare(
      `INSERT INTO comments(post_slug, content, email) VALUES(?, ?, ?);`
    )
      .bind(slug, content, email)
      .run()
    if (success) {
      return c.json('Created', 201)
    } else {
      return c.json('Something went wrong', 500)
    }
  }
)
