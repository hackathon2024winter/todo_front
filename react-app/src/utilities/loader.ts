import { PostData } from './type';

export async function loader() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const posts: PostData[] = await res.json();
  return { posts };
}