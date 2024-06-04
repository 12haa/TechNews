import React from "react";
import SignInButtons from "@/app/(auth)/sign-in/_components/SignInButtons";
import { getServerSession } from "next-auth";
import authOptions from "@/app/lib/auth";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const session = await getServerSession(authOptions);
  console.log(session, "Im Session");
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div>
      <SignInButtons />
    </div>
  );
};
export default SignIn;
