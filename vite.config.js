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

export default defineConfig(() => {
  syncImagesToPublic();
  return {
    root: '.',
    publicDir: 'public',
    server: {
      port: 5173,
    },
    build: {
      rollupOptions: {
        input: {
          main: r('./index.html'),
          umay: r('./umay.html'),
          insansizAraclar: r('./insansiz-araclar.html'),
          iletisim: r('./iletisim.html'),
          kariyer: r('./kariyer.html'),
        },
      },
    },
  };
});
