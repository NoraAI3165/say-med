import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { routing } from './src/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Detect country from headers (nginx sets x-country, or Accept-Language fallback)
  const country = request.headers.get('x-country')?.toUpperCase();
  const acceptLang = request.headers.get('accept-language') || '';

  let detectedLocale: string | undefined;

  // Country-based detection
  if (country === 'TR') {
    detectedLocale = 'tr';
  } else if (country === 'NL') {
    detectedLocale = 'nl';
  }

  // Accept-Language fallback if no country header
  if (!detectedLocale) {
    if (acceptLang.startsWith('tr') || acceptLang.includes('tr-TR')) {
      detectedLocale = 'tr';
    } else if (acceptLang.startsWith('nl') || acceptLang.includes('nl-NL')) {
      detectedLocale = 'nl';
    }
  }

  // Default to English for all other countries
  if (!detectedLocale) {
    detectedLocale = 'en';
  }

  // Set the detected locale as default for next-intl
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Only apply detection on root path (no locale prefix yet)
  if (pathname === '/') {
    url.pathname = `/${detectedLocale}`;
    return Response.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(en|tr|nl)/:path*', '/((?!api|_next|favicon.ico|favicon.svg|images|logos|flags|world\\.geojson|.*\\..*).*)'],
};
