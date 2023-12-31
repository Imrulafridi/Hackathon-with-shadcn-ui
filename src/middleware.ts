import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/products" ,"/female", "/male", "/kids", "/api/webhooks", "/studio/:path*"],
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/api/cart:path*",
    "/products:path*",
    "/studio:path*",
    "/(api|trpc)(.*)",
  ],
};