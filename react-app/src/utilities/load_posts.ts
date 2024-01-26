import { PostData } from './types';

export async function loadPosts() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const posts: PostData[] = await res.json();
  return { posts };
}