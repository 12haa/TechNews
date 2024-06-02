import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismaDB";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const authorEmail = session?.user?.email as string;
  if (!session)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  const { title, content, links, selectedCategory, imageUrl, publicId } =
    await req.json();
  if (!title || !content)
    return NextResponse.json(
      { error: "Title and content are required" },
      { status: 500 },
    );
  try {
    // const session = await getSession();
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        links,
        publicId,
        catName: selectedCategory,
        authorEmail,
        imageUrl,
      },
    });
    console.log("post created");
    return NextResponse.json(newPost);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to Create Post" },
      { status: 500 },
    );
  }
}

export async function GET() {
  const session = getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(posts);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "SomeThing went wrong" });
  }
}
