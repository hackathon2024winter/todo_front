import { useLoaderData } from 'react-router-dom'
import { PostData } from '../utilities/type'

function Post() {
  const { post } = useLoaderData() as { post: PostData }
  return (
    <>
      <h2 className="text-2xl font-semibold mt-3 mb-3">Single Post</h2>
      <div>
        <p>ID:{post.id}</p>
        <p>タイトル:{post.title}</p>
        <p>内容:{post.body}</p>
      </div>
    </>
  )
}

export default Post;