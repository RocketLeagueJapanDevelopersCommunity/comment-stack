import { jsx } from 'hono/jsx'
import { IconComment } from './Icon'
import { Comment } from '../types'

export const Header = (props: { posts: Comment[] }) => {
  const handleOrderChange = () => {
    console.log('aaaa')
  }
  return (
    <div class='sticky top-0 flex justify-between p-2 border-b-2 max-h-11'>
      <h1 class='flex mb-0 inline'>
        <IconComment />
        <span class='pl-1'>{props.posts.length}</span>
      </h1>
      <div class='inline ml-4'>
        <span onClick={handleOrderChange}>おすすめ順</span>｜<span>新着順</span>
      </div>
    </div>
  )
}
