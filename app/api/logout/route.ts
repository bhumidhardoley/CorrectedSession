import { NextResponse } from "next/server";

export async function POST(req:Request) {
    
    try {
        const responese = NextResponse.json({
            message: 'Logout succesful'
        },{status: 200})

       responese.cookies.set("her","",{
        httpOnly: true,
        secure: process.env.NODE_ENV ==="production",
        sameSite: 'strict',
        maxAge: 0,
        path:'/'
       })

       return responese
    } catch(error){
        return NextResponse.json({
            message: 'Logout failed but cookie cleared'
        },{
            status: 500
        })
    }
}