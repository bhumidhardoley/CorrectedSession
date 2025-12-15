import { NextResponse , NextRequest } from "next/server";
import jwt from 'jsonwebtoken'
import { url } from "inspector";

const JWT_SECRET = process.env.JWT_SECRET || "my-simple-thing"

const PUBLIC_PATH = ['/signin','/singup']
const AUTH_PATH ='/homepage'
const SIGNIN_PAGE = '/signin'

export function proxy(request: NextRequest){
    const token =request.cookies.get('her')?.value
    const path = request.nextUrl.pathname

    if(!JWT_SECRET) {
        throw new Error('Set the environment variable')
    }

    const isAuthPathOrRoot = path === '/' || PUBLIC_PATH.some(p=>path.startsWith(p))

    if(token && isAuthPathOrRoot) {
        try{
            jwt.verify(token,JWT_SECRET);
            return NextResponse.redirect(new URL(AUTH_PATH,request.url))
        } catch(error){
            const response = NextResponse.next()
            response.cookies.set('her','',{
                maxAge: 0,
                path:'/'
            })

            return response
        }
    }

    if(path.startsWith(AUTH_PATH)) {
        if(!token) {
            return NextResponse.redirect(new URL(SIGNIN_PAGE,request.url))
    }

 try {
    jwt.verify(token,JWT_SECRET)
    return NextResponse.next()
 } catch(error){
    const response = NextResponse.redirect(new URL(SIGNIN_PAGE,request.url))
    response.cookies.set('her','',{
        maxAge: 0,
        path:'/'
    })

    return response
 }

    }


    return NextResponse.next()
}

// So file sets where to run the middleware and where not to run
// matcher tells exactly that

export const config = {
    
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets).*)'],
};