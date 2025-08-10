import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

const nextIntlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const localeCookie = req.cookies.get('NEXT_LOCALE')?.value;
  
  if (!localeCookie) {
    const response = NextResponse.next();
    response.cookies.set('NEXT_LOCALE', 'fa', { path: '/' });
    return response;
  }

  return nextIntlMiddleware(req);
}

export const config = {
  matcher: [
    '/',
    '/(en|fa|ar)/:path*',
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};