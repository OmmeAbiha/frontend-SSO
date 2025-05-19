import LocaleSwitcherMenu from '@/src/components/LocaleSwitcherMenu';
import { setRequestLocale, getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>
};

export default async function IndexPage({ params }: Props) {
  const { locale } = await params
  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations('IndexPage');

  return (
    <main>
      <p className="max-w-[590px]">
        {t.rich('description', {
          code: (chunks) => (
            <code className="font-mono text-white">{chunks}</code>
          )
        })}
      </p>
      <LocaleSwitcherMenu />
    </main>
  );
}
