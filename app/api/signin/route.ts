import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'


const JWT_SECRET = process.env.JWT_SECRET

export async function POST(req:Request){

    try {
        const {username , password} = await req.json()

        await connectDB();

        if(!password || !username) {
            return NextResponse.json({
                message:'Every Field is required'
            },{status: 401})
        }

        const user = await User.findOne({username})
        if(!user){
            return NextResponse.json({
                message: 'User not Found'
            },
        {status: 400})
        }
        const isPasswrodCorrect = await bcrypt.compare(password,user.password)

        if(!isPasswrodCorrect){
            return NextResponse.json({
                message: 'Invalid Credentials'
            },{
                status: 401
            })
        }

        const tokenPayload = {
            _id:user._id.toString(),
            username: user.username
        }

        if(!JWT_SECRET){
            throw new Error("JWT_secret is not defined")
        }
        const token = jwt.sign(tokenPayload,JWT_SECRET,{expiresIn:'1d'})


      const responese =  NextResponse.json({
            message: 'Login Successful'
        },{
            status: 200
        })


        responese.cookies.set("her",token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            maxAge: 60*60*24,
            path: '/'
        })

        return responese

    } catch(error: any){
        return NextResponse.json({
            message: error.message
        },
    {status: 500})
    }
}