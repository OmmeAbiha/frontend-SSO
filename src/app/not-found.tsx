"use client"
import { useRouter } from 'next/router';
import BaseLayout from '@/components/BaseLayout';
import NotFoundPage from '@/components/NotFoundPage';
import { routing } from '@/i18n/routing';

// This page renders when a route like `/unknown.txt` is requested.
// In this case, the layout at `app/[locale]/layout.tsx` receives
// an invalid value as the `[locale]` param and calls `notFound()`.

export default function GlobalNotFound() {
  const router = useRouter();
  const { someParam } = router.query; // Extract query parameters

  console.log(someParam); // Logs the value of `someParam` from the query string

  return (
    <BaseLayout locale={routing.defaultLocale}>
      <NotFoundPage />
    </BaseLayout>
  );
}

