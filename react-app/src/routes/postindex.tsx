import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface PostData {
  id: number;
  title: string;
  body: string;
}

function PostIndex() {
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
    <ul className="list-disc pl-5 ml-4">
      {posts && posts.map((post) => (
        <li key={post?.id}>
          <Link className="text-blue-600 visited:text-pink-300" to={`/posts/${post?.id}`}>
            {post?.id}:{post?.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default PostIndex;