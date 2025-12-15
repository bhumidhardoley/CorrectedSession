import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Post } from "@/models/Post";
import { connectDB} from "@/lib/mongodb";

interface JwtPayload {
  _id: string;
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // 1️⃣ Get token from cookies
    const token = req.cookies.get("her")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2️⃣ Verify token → get user id
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    // 3️⃣ Get data from client
    const { title, body } = await req.json();

    if (!title || !body) {
      return NextResponse.json(
        { message: "Title and body are required" },
        { status: 400 }
      );
    }

    const post = await Post.create({
      title,
      body,
      author: new mongoose.Types.ObjectId(decoded._id),
    });

    // 5️⃣ Respond
    return NextResponse.json(post, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
