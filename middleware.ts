import { withAuth } from "next-auth/middleware";

// slash is our initial login page
export default withAuth({
  pages: {
    signIn: "/",
  },
});

export const config = {
  matcher: ["/users/:path*", "/conversations/:path*"],
};
