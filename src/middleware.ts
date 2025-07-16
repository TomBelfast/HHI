import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';

import { AllLocales, AppConfig } from './utils/AppConfig';

const intlMiddleware = createMiddleware({
  locales: AllLocales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
});

const isProtectedRoute = createRouteMatcher([
  '/onboarding(.*)',
  '/:locale/onboarding(.*)',
  '/dashboard(.*)',
  '/:locale/dashboard(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const locale = req.nextUrl.pathname.match(/(\/.*)\/dashboard/)?.at(1) ?? '';
    const signInUrl = new URL(`${locale}/sign-in`, req.url);

    await auth.protect({
      unauthenticatedUrl: signInUrl.toString(),
    });
  }

  const authObj = await auth();

  // Redirect to organization selection if user is authenticated but has no org
  if (
    authObj.userId
    && !authObj.orgId
    && req.nextUrl.pathname.includes('/dashboard')
    && !req.nextUrl.pathname.endsWith('/organization-selection')
  ) {
    const orgSelection = new URL(
      '/onboarding/organization-selection',
      req.url,
    );

    return Response.redirect(orgSelection);
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/'
  ],
};
