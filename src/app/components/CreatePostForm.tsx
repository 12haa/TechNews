"use client";
import React, { useState } from "react";
import { FaCopy, FaPlus } from "react-icons/fa";
import { categoriesData } from "@/data";
import Link from "next/link";
import { FaX } from "react-icons/fa6";

const CreatePostForm = () => {
  const [links, setLinks] = useState<String[]>([]);
  const [linkInput, setLinkInput] = useState("");
  const addLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (linkInput.trim() !== "") {
      setLinks((prev) => [...prev, linkInput]);
      setLinkInput("");
    }
  };
  const removeLink = (index: number) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };
  const copyLink = async (textToCopy: string[]) => {
    return await navigator.clipboard.writeText(textToCopy.join("\n"));
  };
  console.log(links, "Im Links");
  return (
    <div>
      <h2>Create Post</h2>
      <form action="" className="flex flex-col w-full gap-2 ">
        <input type="text" placeholder="title" />
        <textarea placeholder="Content" />
        {links &&
          links.map((link, index) => (
            <div key={index} className="flex gap-4 items-center">
              <span
                className="flex items-center gap-2 text-red-700 cursor-pointer"
                onClick={() => copyLink(links)}
              >
                Copy link
                <FaCopy />
              </span>
              <Link href={link}>{link}</Link>
              <span
                className="flex items-center gap-2 text-red-700 cursor-pointer"
                onClick={() => removeLink(index)}
              >
                Remove Link
                <FaX />
              </span>
            </div>
          ))}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Paste Link"
            className="flex-1"
            onChange={(e) => setLinkInput(e.target.value)}
            value={linkInput}
          />
          <button className="btn flex gap-2 items-center" onClick={addLink}>
            <span>
              <FaPlus />
            </span>
            Add
          </button>
        </div>
        <select className="p-3 rounded-md border appearance-none shadow-sm">
          <option value="">Select a Category</option>
          {categoriesData &&
            categoriesData.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
        </select>
        <button className="primary-button" type="submit"></button>
        <div className="p-2 text-red-500 font-bold">Error message</div>
      </form>
    </div>
  );
};
export default CreatePostForm;
