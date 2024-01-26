import { FC } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { PostData } from '../utilities/types'

const PostIndex: FC = () => {
  // 戻り値unknownをPostData[]に変換
  const { posts } = useLoaderData() as { posts: PostData[] };
  return (
    <ul className='list-disc pl-5 ml-4'>
      {posts.map((post) => (
        <li key={post.id}>
          <Link
            className="text-blue-600 visited:text-purple-600"
            to={`/posts/${post.id}`}>
            {post.id}:{post.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default PostIndex;