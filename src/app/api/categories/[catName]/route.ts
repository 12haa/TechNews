import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismaDB";

export async function GET(
  req: Request,
  { params }: { params: { catName: string } },
) {
  try {
    const catName = params.catName;
    const posts = await prisma.category.findUnique({
      where: { catName },
      include: {
        posts: {
          include: { author: true },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return NextResponse.json(posts);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: err.status });
  }
}
