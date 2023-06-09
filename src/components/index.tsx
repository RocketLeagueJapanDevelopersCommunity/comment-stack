import { jsx } from 'hono/jsx'
import { Layout } from '../Layout'
import type { Comment } from '../types'
import { IconComment, IconGood } from './Icon'
import { Header } from './Header'

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

  // const formatContent = (content: string) => {
  //   console.log(content.replace(/\r\n/g, '<br>'))
  //   return content.replace(/\r\n/g, '<br>')
  // }

  return (
    <Layout>
      <Header posts={posts} />
      {/* <Form /> */}
      <div class='h-full overflow-y-auto divide-y pb-11'>
        {posts.reverse().map((post) => {
          return (
            <div class='p-2'>
              <small>{`${post.created_at}  / ID:${formatId(
                post.author_uuid
              )}`}</small>
              <TextComponent postId={post.id} text={post.content} />
              <div class='flex flex-row-reverse'>
                <div class='inline-flex m-2 p-2 border'>
                  <IconGood />
                  <span class='mx-2'>{post.likes}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

function TextComponent(props) {
  const lines = props.text.split(/\r\n/g)
  return (
    <div>
      {lines.map((line, i) => (
        <p
          class='break-all whitespace-pre-wrap'
          key={`${props.postId}-text-line-${i}`}
        >
          {line}
        </p>
      ))}
    </div>
  )
}
