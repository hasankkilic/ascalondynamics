import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));
const r = (p) => fileURLToPath(new URL(p, import.meta.url));

/**
 * images/ klasöründeki dosyaları HTML içinde yazıldığı gibi (/images/...)
 * sunabilmek için Vite'ın publicDir mekanizmasını kullanıyoruz. Bunun için
 * images/ içeriğini public/images/ altına gerçek bir kopya olarak
 * senkronize ediyoruz (sembolik link değil — Windows'ta güvenilir
 * olmadığı için). images/ klasörünün kendisine asla yazılmaz/dokunulmaz;
 * public/images/ tamamen türetilmiş bir kopyadır ve .gitignore'dadır.
 */
function syncImagesToPublic() {
  const src = path.join(projectRoot, 'images');
  const dest = path.join(projectRoot, 'public', 'images');
  try {
    fs.rmSync(dest, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
  fs.mkdirSync(dest, { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
}

export const englishMeta = {
  'index.html': {
    title: 'Ascalon Dynamics | A New Eye in the Field',
    description:
      'Ascalon Dynamics develops modular autonomous technologies for the field through UMAY, UAV, GCS, artificial intelligence, and sensor-fusion layers.',
  },
  'umay.html': {
    title: 'UMAY | Ascalon Dynamics',
    description:
      'UMAY is a concept helmet-mounted augmented-reality system combining thermal and optical data, UAV feeds, and sensor fusion to accelerate operator decisions.',
  },
  'insansiz-araclar.html': {
    title: 'Unmanned Systems | Ascalon Dynamics',
    description:
      'Ascalon Dynamics develops modular, mission-configurable UAV platforms for reconnaissance, surveillance, and field support.',
  },
  'gcs.html': {
    title: 'GCS | Ascalon Dynamics',
    description:
      'The Ascalon Dynamics GCS concept combines GIS maps, video management, sensor telemetry, and command workflows in a single ground-control interface.',
  },
  'yapay-zeka-yazilim.html': {
    title: 'AI & Software Layer | Ascalon Dynamics',
    description:
      'A field-updatable AI and software layer combining perception, sensor fusion, decision support, and edge AI deployment in one architecture.',
  },
  'kariyer.html': {
    title: 'Careers | Ascalon Dynamics',
    description: 'Open positions and CV applications at Ascalon Dynamics.',
  },
  'iletisim.html': {
    title: 'Contact | Ascalon Dynamics',
    description: 'Contact Ascalon Dynamics for company, product, and collaboration inquiries.',
  },
};

function routeUrl(fileName, english = false) {
  const suffix = fileName === 'index.html' ? '' : fileName;
  return `https://ascalondynamics.com/${english ? 'en/' : ''}${suffix}`;
}

function addAlternates(html, fileName) {
  if (html.includes('hreflang="en"')) return html;
  const links = [
    `<link rel="alternate" hreflang="tr" href="${routeUrl(fileName)}" />`,
    `<link rel="alternate" hreflang="en" href="${routeUrl(fileName, true)}" />`,
    `<link rel="alternate" hreflang="x-default" href="${routeUrl(fileName)}" />`,
  ].join('\n    ');
  return html.replace('</head>', `    ${links}\n  </head>`);
}

export function englishHtml(html, fileName) {
  const meta = englishMeta[fileName];
  if (!meta) return html;
  let output = addAlternates(html, fileName)
    .replace('<html lang="tr">', '<html lang="en">')
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${meta.title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${meta.description}" />`
    )
    .replace('<meta property="og:locale" content="tr_TR" />', '<meta property="og:locale" content="en_US" />')
    .replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${meta.title}" />`
    )
    .replace(
      /<meta property="og:description" content="[^"]*" \/>/,
      `<meta property="og:description" content="${meta.description}" />`
    )
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${routeUrl(fileName, true)}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${routeUrl(fileName, true)}" />`);

  output = output
    .replaceAll('Bu deneyim JavaScript gerektirir. Temel gezinme için aşağıdaki bağlantıları kullanabilirsiniz.', 'This experience requires JavaScript. Use the links below for basic navigation.')
    .replaceAll('Bu sayfadaki içerik ve site gezinmesi JavaScript gerektirir. Aşağıdaki taktik simülatör de JavaScript olmadan çalışmaz.', 'The content, navigation, and tactical simulator on this page require JavaScript.')
    .replaceAll('href="/"', 'href="/en/"')
    .replaceAll('href="/insansiz-araclar.html"', 'href="/en/insansiz-araclar.html"')
    .replaceAll('href="/umay.html"', 'href="/en/umay.html"')
    .replaceAll('href="/gcs.html"', 'href="/en/gcs.html"')
    .replaceAll('href="/yapay-zeka-yazilim.html"', 'href="/en/yapay-zeka-yazilim.html"')
    .replaceAll('href="/kariyer.html"', 'href="/en/kariyer.html"')
    .replaceAll('href="/iletisim.html"', 'href="/en/iletisim.html"');

  return output;
}

function englishMirrorPlugin() {
  return {
    name: 'ascalon-english-pages',
    enforce: 'post',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url === '/en' || req.url?.startsWith('/en/')) {
          req.url = req.url.replace(/^\/en(?=\/|$)/, '') || '/';
        }
        next();
      });
    },
    generateBundle(_options, bundle) {
      const pages = Object.values(bundle).filter(
        (entry) => entry.type === 'asset' && entry.fileName.endsWith('.html') && !entry.fileName.startsWith('en/')
      );

      pages.forEach((page) => {
        const fileName = page.fileName;
        page.source = addAlternates(String(page.source), fileName);
        const englishFileName = `en/${fileName}`;
        bundle[englishFileName] = {
          ...page,
          fileName: englishFileName,
          source: englishHtml(String(page.source), fileName),
        };
      });
    },
  };
}

export default defineConfig(() => {
  syncImagesToPublic();
  return {
    root: '.',
    publicDir: 'public',
    plugins: [englishMirrorPlugin()],
    server: {
      port: 5173,
    },
    build: {
      rollupOptions: {
        input: {
          main: r('./index.html'),
          umay: r('./umay.html'),
          insansizAraclar: r('./insansiz-araclar.html'),
          gcs: r('./gcs.html'),
          yapayZekaYazilim: r('./yapay-zeka-yazilim.html'),
          iletisim: r('./iletisim.html'),
          kariyer: r('./kariyer.html'),
        },
      },
    },
  };
});
