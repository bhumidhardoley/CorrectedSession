import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { strict } from "assert";

export async function POST(req: Request) {
  try {
    const { username, password }: { username: string; password: string } =
      await req.json();

    await connectDB();

     if(!password || !username) {
            return NextResponse.json({
                message:'Every Field is required'
            },{status: 401})
        }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    const tokenPayload = {
      _id: newUser._id.toString(),
      username: newUser.username
    }

    if(!process.env.JWT_SECRET) {

      throw new Error("Please provide a JWT secret")
    }
    const token = jwt.sign(tokenPayload,process.env.JWT_SECRET,{
expiresIn : '1d'
    })

    const response = NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );


    response.cookies.set('her',token,{
      httpOnly: true,
      secure: process.env.NODE_ENV ==="production",
      sameSite: 'strict',
      maxAge: 60*60*24,
      path:'/'
    })

    return response

  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
