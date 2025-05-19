import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import { staticRoutes } from './staticRoutes';


const pathnames = Object.fromEntries(staticRoutes.map((route) => [route, route]));

export const routing = defineRouting({
  locales: ['fa', 'en', 'ar'],
  defaultLocale: 'fa',
  pathnames,
  // '/pathnames': {
  //   fa: '/pathnames',
  //   en: '/pathnames',
  //   ar: '/pathnames'
  // }
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter } = createNavigation(routing);
