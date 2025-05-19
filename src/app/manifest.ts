import { MetadataRoute } from 'next';
import { getTranslations } from 'next-intl/server';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const locale = 'fa';
  const t = await getTranslations({ locale, namespace: 'Manifest' });

  return {
    name: "تربیت فکرها و تثبیت باورها",
    short_name: "Omme Abiha",
    description: ' هدف از تشکیل این مجموعه ، فراهم نمودن بستری برای تحصیل علوم واجب دینی(اعتقادات ، قران ، احکام) برای برادران و خواهران می باشد. این مجموعه در طول هفته فعالیت های متنوعی در راستای اعتلای پرچم تشیع انجام میدهد و به صورت کاملا مردمی اداره شده و کلیه خدمات خود را به صورت کاملا رایگان در اختیار عموم مردم قرار می دهد. کلیه فعالیت ها متناسب با طبع و نظر مخاطب جوان انجام میشود و حول محور این شعار (تربیت فکرها و تثبیت باورها) انجام می پذیرد.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f4b41b',
    theme_color: '#f4b41b',
    icons: [
      {
        src: '/common/logo/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/common/logo/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/common/logo/favicon.svg',
        sizes: '32x32',
        type: 'image/svg+xml',
      },
      {
        src: '/common/logo/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      },
      {
        src: '/common/logo/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}