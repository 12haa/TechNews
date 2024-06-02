import Image from "next/image";
import CategoriesList from "@/app/components/CategoriesList";
import Post from "@/app/components/Post";
import { TPost } from "@/app/types";

const getPosts = async (): Promise<TPost[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, {
      cache: "no-store",
    });
    if (res.ok) {
      const posts = await res.json();
      return posts;
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};

export default async function Home() {
  const postsData = await getPosts();
  return (
    <>
      <CategoriesList />
      {postsData && postsData.length > 0 ? (
        postsData.map((post, index) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            image={post.imageUrl as string}
            authorEmail={post.authorEmail}
            author={post.author.name}
            description={post.content}
            category={post.catName}
          />
        ))
      ) : (
        <div className="py-6"> No posts to display</div>
      )}
    </>
  );
}
