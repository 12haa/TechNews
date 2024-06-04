import React from "react";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "@/app/components/DeleteButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface PostPageProps {
  title: string;
  description: string;
  image?: string;
  authorEmail?: string;
  id: string;
  author?: string;
  category?: string;
  link?: string[];
}

const isEditable = true;
const Post = async ({
  title,
  id,
  description,
  image,
  author,
  authorEmail,
  category,
  link,
}: PostPageProps) => {
  const session = await getServerSession(authOptions);
  const date = new Date().toLocaleDateString("en-US", {});
  const isEditable = session && session?.user?.email === authorEmail;
  console.log(image, "im  image");
  return (
    <div className="my-4 border-b border-gray-200  py-8">
      <div className="mb-4 ">
        <span className="font-bold">Posted By {author}</span> On {date}
      </div>
      <div className="w-full h-72 relative">
        {image ? (
          <img
            src={image}
            alt={image}
            className="object-cover rounded-md object-center w-96 he-96 "
          />
        ) : (
          <p>No Images to Show</p>
        )}
      </div>
      {category && (
        <Link
          className="bg-slate-800 w-fit text-white px-4 py-2.5 text-sm font-bold rounded-md mt-4 block"
          href={`categories/${category}`}
        >
          {category}
        </Link>
      )}
      <h2 className="">{title}</h2>
      <p className="content">{description}</p>
      <Link className="text-blue-900 font-medium" href={`${link}`}>
        {link}
      </Link>
      {isEditable && (
        <div className="flex gap-3 font-bold py-2 px-4 text-sm text-gray-500 bg-slate-200 w-fit rounded-md">
          <Link href={`/edit-post/${id}`}>Edit</Link>
          <DeleteButton id={id} />
        </div>
      )}
    </div>
  );
};

export default Post;
