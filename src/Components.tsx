import { jsx } from 'hono/jsx'
import { Layout } from './Layout'
import type { Comment } from './types'
import { CommentIcon } from './Icon'

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

  const formatId = (uuid: string) => {
    return uuid.split('-')[4]
  }
  return (
    <Layout>
      <div class='sticky top-0 flex justify-between p-2 border-b-2'>
        <h1 class='flex mb-0 inline'>
          <CommentIcon />
          <span class='pl-1'>{props.posts.length}</span>
        </h1>
        <div class='inline ml-4'>
          <span>おすすめ順</span>｜<span>新着順</span>
        </div>
      </div>
      {/* <Form /> */}
      <div class='h-full overflow-y-auto divide-y'>
        {posts.reverse().map((post) => {
          return (
            <div class='p-2'>
              <small>{`${post.created_at}  / ID:${formatId(
                post.author_uuid
              )}`}</small>
              <p>{post.content}</p>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}
