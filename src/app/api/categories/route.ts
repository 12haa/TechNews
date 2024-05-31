import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismaDB";

export async function GET() {
  try {
    const response = await prisma.category.findMany({});
    return NextResponse.json(response);
  } catch (err) {
    return NextResponse.json("SomeThing went wrong");
  }
}
