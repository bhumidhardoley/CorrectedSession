import { NextResponse,NextRequest } from "next/server";
import { Post } from "@/models/Post";
import { connectDB } from "@/lib/mongodb";
import jwt from 'jsonwebtoken'
import { JwtPayload } from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  if(!JWT_SECRET) {
    throw new Error("You need to logged in")
  }
   
  const { title, body } = await req.json();

  const resolvedParams = await params
  const postId = resolvedParams.id

  const token =req.cookies.get('her')?.value
  if(!token) return NextResponse.json({message: 'unauthorized'})

  let userId:string

  
    try{

      const user = jwt.verify(token,JWT_SECRET) as JwtPayload
      userId = user._id

    } catch(error){
                const response = NextResponse.next()
                response.cookies.set('her','',{
                    maxAge: 0,
                    path:'/'
                })
    
                return response
            }
  



  const post = await Post.findById(postId)
  if(!post) return NextResponse.json({message: 'Post Not Found'})

    if(post.author.toString() !== userId) {
      return NextResponse.json({message: 'Forbidden'},{status:403})
    }

    post.title = title
    post.body = body;
    await post.save();
    return NextResponse.json({message: "Post updated successfully"})
  
}
