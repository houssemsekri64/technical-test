import { NextResponse } from "next/server";
import { verifyJwtToken } from "./app/utils/auth";
export async function middleware(request) {
  const { url, nextUrl, cookies } = request;
  const { value: token } = cookies.get("token") ?? { value: null };

  const hasVerifiedToken = token && (await verifyJwtToken(token));

  if (nextUrl.pathname === "/logout") {
    const response = NextResponse.redirect(new URL("/", url));
    response.cookies.delete("token");
    return response;
  }

  if (!hasVerifiedToken) {
    const searchParams = new URLSearchParams(nextUrl.searchParams);
    searchParams.set("next", nextUrl.pathname);

    const response = NextResponse.redirect(new URL("/", url));
    response.cookies.delete("token");

    return response;
  }

  return NextResponse.next();
}

export const config = { matcher: ["/logout", "/dashboard/:path*"] };
