import { LoaderFunctionArgs } from 'react-router-dom';
import { PostData } from './type';

export async function PostLoader({ params }: LoaderFunctionArgs) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`);
  const post: PostData = await res.json();
  return { post };
}