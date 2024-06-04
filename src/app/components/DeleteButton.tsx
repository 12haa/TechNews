"use client";
import React from "react";
import { revalidatePath } from "next/cache";

const DeleteButton = ({ id }: { id: string }) => {
  const deleteImage = async (publicId: string) => {
    const res = await fetch(`/api/removeImage`, {
      method: "POST",
      headers: {
        contentType: "application/json",
      },
      body: JSON.stringify({
        publicId,
      }),
    });
  };
  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete");
    if (confirmed) {
      try {
        const response = await fetch(`api/posts/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          console.log("Success");
          const post = await response.json();
          const { publicId } = post;
          await deleteImage(publicId);
          revalidatePath("/");
        }
        revalidatePath("/");
      } catch (err) {
        console.log(err);
        // Handle error
      }
    }
  };
  return (
    <button onClick={handleDelete} className="text-red-600">
      Delete
    </button>
  );
};
export default DeleteButton;
