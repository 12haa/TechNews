"use client";
import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";

const SignInButtons = () => {
  return (
    <>
      <h1 className="text-center mt-8">SignIn</h1>
      <div className="mt-4 p-4 flex flex-col items-center justify-center gap-4">
        <button
          className="flex items-center border p-4 rounded-full gap-4 hover:bg-slate-100 /25 font-bold transition"
          onClick={() => signIn("github")}
        >
          <span>
            <FaGithub
              style={{ width: "40px", height: "40px" }}
              title="GitHub"
            />
          </span>
          Sign In with GitHub
        </button>
        <button
          className="flex items-center border p-4 rounded-full gap-4 hover:bg-slate-100 /25 font-bold transition"
          onClick={() => signIn("google")}
        >
          <span>
            <FaGoogle
              style={{ width: "40px", height: "40px" }}
              title="GitHub"
            />
          </span>
          Sign In with Google
        </button>
      </div>
    </>
  );
};
export default SignInButtons;
