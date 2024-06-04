import React from "react";
import EditPostForm from "@/app/edit-post/_component/EditPostForm";
import { TPost } from "@/app/types";
import { getServerSession } from "next-auth";
import authOptions from "@/app/lib/auth";
import { redirect } from "next/navigation";

const getPost = async (id: string): Promise<TPost[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${id}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const post = await res.json();
      return post;
    }
  } catch (err) {
    console.log(err, "Error Getting Post");
  }
  return null;
};
const EditPostPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const session = await getServerSession(authOptions);
  if (!session) redirect("/sign-in");
  const posts = await getPost(id);
  return (
    <>
      {posts ? (
        <EditPostForm post={posts} />
      ) : (
        <div>Post not found to Edit</div>
      )}
    </>
  );
};
export default EditPostPage;
