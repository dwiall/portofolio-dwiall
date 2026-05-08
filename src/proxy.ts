import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
});

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/admin/experience/:path*",
    "/admin/projects/:path*",
    "/admin/skills/:path*",
    "/admin/certificates/:path*",
    "/admin/contacts/:path*",
    "/admin/settings/:path*"
  ],
};
