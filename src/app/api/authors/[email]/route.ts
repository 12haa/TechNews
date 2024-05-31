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
        posts: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return NextResponse.json({ authors, message: "author Fetched" });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}
