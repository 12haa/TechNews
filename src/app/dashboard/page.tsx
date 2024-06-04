import React from "react";
import Post from "@/app/components/Post";
import Link from "next/link";
import { getServerSession } from "next-auth";
import authOptions from "@/app/lib/auth";
import { redirect } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { TPost } from "@/app/types"; // Import CSS first
const getPosts = async (email: string) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/authors/${email}`);
    const { posts } = await res.json();
    return posts;
  } catch (err) {
    console.log(err);
    return null;
  }
};
const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  let postArray = [];
  console.log(session, "Im Session");
  if (!session) {
    redirect("/sign-in");
  }
  if (email) {
    postArray = await getPosts(email);
  }
  console.log(postArray, "Post Array");

  return (
    <div>
      <h1>My Posts</h1>
      {postArray && postArray.length > 0 ? (
        postArray.map((post: TPost, index: number) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            image={post.imageUrl || ""}
            authorEmail={post.authorEmail}
            author={session?.user?.name || undefined}
            description={post.content}
            category={post.catName}
            link={post.links || []}
          />
        ))
      ) : (
        <div className="py-6 ">
          <div> No posts Created yet</div>
          <Link className="underline" href={"/create-post"}></Link>
        </div>
      )}
    </div>
  );
};
export default DashboardPage;
