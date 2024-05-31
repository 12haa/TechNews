import Image from "next/image";
import CategoriesList from "@/app/components/CategoriesList";
import Post from "@/app/components/Post";
import { postData } from "@/data";

export default function Home() {
  return (
    <>
      <CategoriesList />
      {postData && postData.length > 0 ? (
        postData.map((post, index) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            image={post.imagePath}
            authorEmail="test@example.com"
            author={post.author}
            description={post.description}
            category={post.category}
          />
        ))
      ) : (
        <div className="py-6"> No posts to display</div>
      )}
    </>
  );
}
