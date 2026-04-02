import createMiddleware from 'next-intl/middleware';
import { routing } from './src/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(en|tr|nl)/:path*', '/((?!api|_next|favicon.ico|images|logos|flags|.*\\..*).*)'],
};
