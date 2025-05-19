import * as fs from 'fs';
import * as path from 'path';

const appDir = path.join(__dirname, '..', 'app');

// بررسی میکنیم segment معتبر هست یا نه (اگر مثل [locale] یا (auth) باشد حذف شود)
function isValidSegment(segment: string): boolean {
  // حذف segments که دقیقا داخل کروشه [] یا پرانتز () باشند
  if (/^\[.*\]$/.test(segment)) return false;  // مثل [locale]
  if (/^\(.*\)$/.test(segment)) return false;  // مثل (auth)
  if (segment === 'index') return false;      // حذف index
  return true;
}

function getRoutes(dir: string, baseSegments: string[] = []): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let routes: string[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith('_') || entry.name.startsWith('.')) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!isValidSegment(entry.name)) {
        // رد کردن این segment و ادامه دادن بدون افزودنش به baseSegments
        const childRoutes = getRoutes(fullPath, baseSegments);
        routes = routes.concat(childRoutes);
      } else {
        // اضافه کردن segment به baseSegments
        const newBaseSegments = [...baseSegments, entry.name];
        const childRoutes = getRoutes(fullPath, newBaseSegments);
        routes = routes.concat(childRoutes);
      }

    } else {
      // فایل‌های صفحه
      if (
        entry.name === 'page.tsx' ||
        entry.name === 'page.jsx' ||
        entry.name === 'page.ts' ||
        entry.name === 'page.js'
      ) {
        // ساخت مسیر از baseSegments، ابتدا segmentهای نامعتبر را حذف کنیم
        const filteredSegments = baseSegments.filter(isValidSegment);

        // اگر خالی بود مسیر اصلی
        const route = filteredSegments.length > 0 ? `/${filteredSegments.join('/')}` : '/';
        routes.push(route);
      }
    }
  }

  return routes;
}

const routes = getRoutes(appDir);

// حذف تکراری و مرتب‌سازی
const uniqueRoutes = Array.from(new Set(routes)).sort();

const output = `export const staticRoutes = ${JSON.stringify(uniqueRoutes, null, 2)};\n`;

const outputPath = path.join(__dirname, 'staticRoutes.ts');
fs.writeFileSync(outputPath, output, 'utf-8');

console.log('✅ Pathnames',uniqueRoutes);

// npx tsx src/i18n/generated-pathnames.ts