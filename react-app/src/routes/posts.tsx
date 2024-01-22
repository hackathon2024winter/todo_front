import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

interface PostData {
  id: number;
  title: string;
  body: string;
}

function Posts() {
  const [posts, setPosts] = useState<PostData[] | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-semibold mt-3 mb-3 ">
        Posts
      </h2>
      <ul>
        {posts && posts.map((post) => (
          <li key={post?.id}>
            <Link className="text-blue-600 visited:text-pink-300" to={`/posts/${post?.id}`}>
              {post?.id}:{post?.title}
            </Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </>
  );
}

export default Posts;