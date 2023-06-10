import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { cache } from 'hono/cache'
import { etag } from 'hono/etag'
import { commentsApi } from './apis/comments'

export type Env = {
  DB: D1Database
}

const app = new Hono()
app.get(
  '*',
  cache({
    cacheName: 'api-stack-cache',
    cacheControl: 'max-age=3600',
  })
)
app.use('/*', cors({ origin: ['http://localhost:3000'] }))
app.use('/*', etag())
app.route('/api/v1/', commentsApi)

app.get('/hello', (c) => c.json('Hello!'))

export default app
