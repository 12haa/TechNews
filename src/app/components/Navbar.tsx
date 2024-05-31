"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { FaPlusCircle } from "react-icons/fa";
// Create a random number javascript function
const Navbar = () => {
  const { status, data: session } = useSession();
  const [modal, setModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setModal(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    if (!modal) document.removeEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [modal]);
  return (
    <div className="flex justify-between pb-4 border-b mb-4 relative">
      <div>
        <Link href="/">
          <h1 className="text-4xl font-bold tracking-tighter text-dark">
            TechNews
          </h1>
          <p className="text-sm">
            Exploring Tomorrow's Innovations,
            <br /> One Byte at a Time.
          </p>
        </Link>
      </div>
      {status === "authenticated" ? (
        <>
          <div
            ref={modalRef}
            className={`absolute z-30 right-0 top-20 bg-white p-6 shadow-lg rounded-md  flex-col gap-2 text-right min-h-[160px] ${modal ? "flex" : "hidden"}`}
          >
            <div className="font-bold">{session?.user?.name}</div>
            <Link href={"/dashboard"} onClick={() => setModal(false)}>
              Dashboard
            </Link>
            <Link href={"/create-post"} onClick={() => setModal(false)}>
              Create Post{" "}
            </Link>
            <button className="btn" onClick={() => signOut()}>
              Sign Out
            </button>
          </div>
          <div className="flex gap-2 items-center  ">
            <Link
              href={"/create-post"}
              className="md:flex gap-2 items-center hidden"
            >
              <span>
                <FaPlusCircle />
              </span>
              <span>Create New</span>
            </Link>
            <Image
              src={session?.user?.image || ""}
              alt={session?.user?.name || ""}
              width={40}
              height={40}
              className="rounded-full cursor-pointer"
              onClick={() => setModal(!modal)}
            />
          </div>
        </>
      ) : (
        <div className="flex items-center">
          <Link href={"/sign-in"} className="btn">
            SignIn
          </Link>
        </div>
      )}
    </div>
  );
};
export default Navbar;
