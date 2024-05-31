import React from "react";
import { postData } from "@/data";
import Post from "@/app/components/Post";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import "react-toastify/dist/ReactToastify.css"; // Import CSS first
import { Slide, toast } from "react-toastify";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session, "Im Session");
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <div>
      <h1>My Posts</h1>
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
        <div className="py-6 ">
          <div> No posts Created yet</div>
          <Link className="underline" href={"/create-post"}></Link>
        </div>
      )}
    </div>
  );
};
export default DashboardPage;
