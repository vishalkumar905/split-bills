import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

const PUBLIC_FILE = /\.(.*)$/;


export async function middleware(request: NextRequest) {
  const session = await getToken({ req: request, secret });
  const { pathname } = request.nextUrl;

  const isAuthenticated = session?.email;

  if (PUBLIC_FILE.test(pathname) || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  if (isAuthenticated) {
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/groups', request.url))
    }
  }

  if (!isAuthenticated && pathname !== "/") {
    console.log(request.url, new URL('/', request.url))

    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next();



  // Use NextAuth's JWT utility to extract the token from cookies
  // const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  
  // const url = request.nextUrl.clone();

  // // Protect routes starting with `/protected`
  // if (url.pathname.startsWith("/protected") && !token) {
  //   url.pathname = "/login"; // Redirect to login if no token
  //   return NextResponse.redirect(url);
  // }

  // console.log({ token })

  // Allow the request to continue
  return NextResponse.next();
}