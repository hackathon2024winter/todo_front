import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface PostData {
  id: number;
  title: string;
  body: string;
}

function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState<PostData | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      const data: PostData = await res.json();
      setPost(data);
    };
    if (postId) {
      fetchPost();
    }
  }, [postId])

  return (
    <>
      <h2 className="text-2xl font-semibold mt-3 mb-3">Single Post {postId}</h2>
      <div>
        <p>ID:{post?.id}</p>
        <p>タイトル:{post?.title}</p>
        <p>内容:{post?.body}</p>
      </div>
    </>
  );
}

export default Post;