import {NextRequest , NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import {Post} from '@/models/Post'
import { connectDB } from '@/lib/mongodb'
import { unauthorized } from 'next/navigation'

interface JwtPayload {
    _id: string
}

export async function GET(req: NextRequest){
    try {
        await connectDB();
        const token = req.cookies.get('her')?.value;

        if(!token) {
            return NextResponse.json({
                message: 'unauthorized'
            },{status:401})
        }

        if(!process.env.JWT_SECRET){
            throw new Error('Please enter token')
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET) as JwtPayload


        const posts = await Post.find({
            author: decoded._id,
        })
        .sort({createdAt: -1})

        return NextResponse.json(posts)
    } catch(error) {
        return NextResponse.json({
            message: 'Failed to fetch the posts'
        },{status: 500})
    }
}