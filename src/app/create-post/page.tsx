import React from "react";
import CreatePostForm from "@/app/components/CreatePostForm";
import { getServerSession } from "next-auth";
import authOptions from "@/app/lib/auth";
import { redirect } from "next/navigation";

const CreatePostPage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session, "Im Session");
  if (!session) redirect("/sign-in");
  return <CreatePostForm />;
};
export default CreatePostPage;
