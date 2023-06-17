import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { cache } from 'hono/cache'
import { etag } from 'hono/etag'
import { commentsApi } from './apis/comments'

export type Env = {
  DB: D1Database
}

const app = new Hono().basePath('/api/v1')

// TODO: 開発環境だとキャッシュ効きすぎて困るので使う時にコメントアウト外す
// app.get(
//   '*',
//   cache({
//     cacheName: 'api-stack-cache',
//     cacheControl: 'max-age=3600',
//   })
// )
app.use('/*', cors({ origin: ['http://localhost:3000'] }))

// TODO: 同上
// app.use('/*', etag())
app.route('/comments', commentsApi)

app.get('/hello', (c) => c.json('Hello!'))

export default app
