import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismaDB";

export async function GET(
  req: Request,
  { params }: { params: { email: string } },
) {
  try {
    const email: string = params.email;
    const authors = await prisma.user.findUnique({
      where: { email },
      include: {
        posts: {},
      },
    });
    return NextResponse.json(authors);
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}
