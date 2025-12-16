import { NextResponse } from "next/server";
import { Post } from "@/models/Post";
import { connectDB } from "@/lib/mongodb";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const { title, body } = await req.json();

  const resolvedParams = await params


  const post = await Post.findByIdAndUpdate(
    resolvedParams.id,
    { title, body },
    { new: true, runValidators: true }
  );

  if (!post) {
    return NextResponse.json(
      { message: "Post not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { message: "Post updated successfully", post },
    { status: 200 }
  );
}
