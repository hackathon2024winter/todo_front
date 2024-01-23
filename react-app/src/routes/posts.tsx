import { useLoaderData } from 'react-router-dom';
import { PostData } from '../utilities/type';

function Posts() {
  // 戻り値unknownをPostData[]に変換
  const { posts } = useLoaderData() as { posts: PostData[] };
  return (
    <>
      <h2 className="text-2xl font-semibold mt-3 mb-3">Posts</h2>
      <ul className='list-disc pl-5 ml-4'>
        {posts.map((post) => (
          <li key={post.id}>
            {post.id}:{post.title}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Posts;