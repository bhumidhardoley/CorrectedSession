import { NextResponse } from "next/server";
import { Post } from "@/models/Post";
import { connectDB } from "@/lib/mongodb";
import { revalidatePath } from 'next/cache';


export async function DELETE(
    req: Request,
    {params}:{params:{id:string}}
){
    await connectDB()
    const resolvedParams = await params
    await Post.findByIdAndDelete(resolvedParams.id)
    revalidatePath('/homepage');
    return NextResponse.json({success: true})
}

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