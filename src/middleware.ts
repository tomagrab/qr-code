import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  // This pattern now matches /api/youtube/ followed by any characters
  publicRoutes: ['/api', '/api/YouTubeLink/:path*'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
