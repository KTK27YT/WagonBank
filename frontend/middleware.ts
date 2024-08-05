import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Get the user token from cookies
    const token = request.cookies.get('user_tokens');

    // Define the paths that require authentication
    const protectedPaths = ['/dashboard'];

    // Check if the requested path is protected
    const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path));

    if (isProtectedPath && !token) {
        // Redirect to login if the user is not authenticated
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Allow the request to proceed if authenticated or not a protected path
    return NextResponse.next();
}





// Specify the matcher to apply middleware only to specific routes
export const config = {
    matcher: ['/dashboard'],
};