import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

let path = ["/account/login", "/account/signup"];
export function middleware(request) {
  let JWT = request.cookies.get("token");
  let isAuth = request.cookies.get("isAuth");
  console.log("middleware middle", request.nextUrl.pathname);

  if (!JWT && !isAuth && !path.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/account/login", request.url));
  }

  if (JWT && isAuth) {
    try {
      const decoded = jwtDecode(JWT.value);
      if (decoded && decoded.email) {
        if (path.includes(request.nextUrl.pathname)) {
          return NextResponse.redirect(new URL("/user/profile", request.url));
        }
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/account/login", request.url));
      }
    } catch (e) {
      console.log("Error decoding JWT:", e);
      return NextResponse.redirect(new URL("/account/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/user/:path*", "/account/:path*"],
};
