import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  // This pattern now matches /api/youtube/ followed by any characters
  publicRoutes: [
    '/',
    '/QRCode',
    /^\/QRCode\/([^\/]+)$/,
    '/api',
    /^\/api\/([^\/]+)$/,
    /^\/api\/YouTubeLink\/([^\/]+)$/,
  ],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)'],
};
