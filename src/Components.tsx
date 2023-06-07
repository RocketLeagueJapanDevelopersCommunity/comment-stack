import { jsx } from 'hono/jsx'
import { Layout } from './Layout'
import type { Comment } from './types'

const Form = () => {
  return (
    <form action='/post' method='POST'>
      <label>
        <textarea
          name='body'
          rows='5'
          cols='33'
          placeholder='コメントを入力...'
        ></textarea>
      </label>
      <input type='submit' />
    </form>
  )
}

export const Top = (props: { posts: Comment[] }) => {
  const posts = props.posts
  return (
    <Layout>
      <div>
        <h1 class='mb-0 inline'>{props.posts.length} 件のコメント</h1>
        <select class='inline w-32 ml-4'>
          <option value='' selected>
            新しい順
          </option>
          <option>評価順</option>
        </select>
      </div>
      <Form />
      <div class='h-full overflow-y-auto p-2'>
        {posts.reverse().map((post) => {
          return (
            <article
              class='shadow-md my-4'
              style='border: 1px solid rgba(0,0,0,.1);'
            >
              <p>{post.content}</p>
              <small>{post.author_uuid}</small>
            </article>
          )
        })}
      </div>
    </Layout>
  )
}
