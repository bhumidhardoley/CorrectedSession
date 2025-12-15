import { NextResponse, NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

// ⚠️ IMPORTANT: Ensure this is set in your .env.local file
const JWT_SECRET = process.env.JWT_SECRET || "your-very-strong-fallback-secret"; 

// Paths that a LOGGED-IN user should be redirected AWAY from.
// NOTE: We DO NOT include '/' here, but check it explicitly in the logic.
const PUBLIC_AUTH_PATHS = ['/signup', '/signin']; 

// The path that requires a session (the user's main app page)
const AUTH_REQUIRED_PATH = '/homepage'; 
// The destination for non-authenticated users
const SIGNIN_PAGE = '/signin'; 

export function proxy(request: NextRequest) {
    const token = request.cookies.get('her')?.value;
    const path = request.nextUrl.pathname;

    // Safety check for the secret
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET environment variable is not set.");
    }
    
    // --- Determine if the current path is a path we should redirect AWAY from if authenticated ---
    // 1. Is it the exact root path? (e.g., /)
    // 2. Does it start with /signin or /signup?
    const isAuthPathOrRoot = path === '/' || PUBLIC_AUTH_PATHS.some(p => path.startsWith(p));

    // ----------------------------------------------------------------------
    // 1. LOGGED-IN USER ACCESSING PUBLIC/AUTH PAGES (Includes the root '/')
    // Goal: If they have a valid token AND are on an auth page or root, send them to the homepage.
    // ----------------------------------------------------------------------
    if (token && isAuthPathOrRoot) {
        try {
            jwt.verify(token, JWT_SECRET);
            
            // Redirect valid user away from the public/auth page or root (/) to the authenticated home.
            return NextResponse.redirect(new URL(AUTH_REQUIRED_PATH, request.url));
        } catch (error) {
            // Token is invalid/expired. Delete the bad cookie and proceed to the requested page 
            // (which should be handled by the next check, but we delete the cookie regardless).
            const response = NextResponse.next();
            response.cookies.set('her', '', { maxAge: 0, path: '/' }); 
            return response;
        }
    }

    // ----------------------------------------------------------------------
    // 2. UNAUTHENTICATED USER ACCESSING PROTECTED PATHS (Protect /homepage)
    // Goal: If they don't have a valid token AND are trying to reach /homepage, send them to /signin.
    // ----------------------------------------------------------------------
    if (path.startsWith(AUTH_REQUIRED_PATH)) {
        
        // If NO token exists, redirect to the sign-in page.
        if (!token) { 
            return NextResponse.redirect(new URL(SIGNIN_PAGE, request.url));
        }

        // If token exists, verify it.
        try {
            jwt.verify(token, JWT_SECRET);
            
            // Token is valid, allow access.
            return NextResponse.next();
        } catch (error) {
            // Token is invalid/expired. Delete the bad cookie and redirect to sign-in.
            const response = NextResponse.redirect(new URL(SIGNIN_PAGE, request.url));

            response.cookies.set('her', '', { maxAge: 0, path: '/' });
            
            return response;
        }
    } 

    // ----------------------------------------------------------------------
    // 3. DEFAULT: Allow access to all other paths 
    // (e.g., public API routes, static assets, etc. not covered by the matcher exclusions)
    // ----------------------------------------------------------------------
    return NextResponse.next();
}

export const config = {
    // This runs the middleware on all page requests but skips assets, API routes, and internal files.
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets).*)'],
};