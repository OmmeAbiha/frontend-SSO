import * as fs from 'fs';
import * as path from 'path';

const appDir = path.join(__dirname, '..', 'app');

function isValidSegment(segment: string): boolean {
  if (/^\[.*\]$/.test(segment)) return false;
  if (/^\(.*\)$/.test(segment)) return false;
  if (segment === 'index') return false;
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
        const childRoutes = getRoutes(fullPath, baseSegments);
        routes = routes.concat(childRoutes);
      } else {
        const newBaseSegments = [...baseSegments, entry.name];
        const childRoutes = getRoutes(fullPath, newBaseSegments);
        routes = routes.concat(childRoutes);
      }

    } else {
      if (
        entry.name === 'page.tsx' ||
        entry.name === 'page.jsx' ||
        entry.name === 'page.ts' ||
        entry.name === 'page.js'
      ) {
        const filteredSegments = baseSegments.filter(isValidSegment);

        const route = filteredSegments.length > 0 ? `/${filteredSegments.join('/')}` : '/';
        routes.push(route);
      }
    }
  }

  return routes;
}

const routes = getRoutes(appDir);

const uniqueRoutes = Array.from(new Set(routes)).sort();

const output = `export const staticRoutes = ${JSON.stringify(uniqueRoutes, null, 2)};\n`;

const outputPath = path.join(__dirname, 'staticRoutes.ts');
fs.writeFileSync(outputPath, output, 'utf-8');

console.log('✅ Pathnames', uniqueRoutes);

// npx tsx src/i18n/generated-pathnames.ts