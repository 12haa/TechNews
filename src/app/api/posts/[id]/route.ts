import prisma from "@/app/lib/prismaDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/lib/auth";
export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const posts = await prisma.post.findUnique({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json(posts);
  } catch (err: any) {
    return NextResponse.json(
      { message: "Could not find the post" },
      { status: 404, statusText: err.message },
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { title, content, links, selectedCategory, imageUrl, publicId } =
    await req.json();
  const id = params.id;
  try {
    const posts = await prisma.post.update({
      where: {
        id,
      },
      data: {
        title: title,
        content: content,
        links: links,
        catName: selectedCategory,
        imageUrl: imageUrl,
        publicId: publicId,
      },
    });
    return NextResponse.json(posts);
  } catch (err) {
    console.log(err, "error");
    return NextResponse.json({ message: "Error Editing Post" });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  try {
    const data = await prisma.post.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json({ data, message: "Delete Post successfully" });
  } catch (err) {
    console.log(err, "error");
    return NextResponse.json({ message: "Error Deleting Post" });
  }
}
