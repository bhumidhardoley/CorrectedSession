import { NextResponse } from "next/server";
import { Post } from "@/models/Post";
import { connectDB } from "@/lib/mongodb";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  
   const resolvedParams = await params

  const post = await Post.findById(resolvedParams.id);

  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}