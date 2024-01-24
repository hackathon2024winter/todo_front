import { LoaderFunctionArgs } from 'react-router-dom';
import { PostData } from './type';

export async function loadPost({ params }: LoaderFunctionArgs) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`);
  if (!res.ok) {
    throw Error('Not Found');
  }

  const post: PostData = await res.json();
  return { post };
}