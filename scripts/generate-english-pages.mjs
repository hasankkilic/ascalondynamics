import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { englishHtml, englishMeta } from '../vite.config.js';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDirectory = path.join(projectRoot, 'en');

fs.mkdirSync(outputDirectory, { recursive: true });

for (const fileName of Object.keys(englishMeta)) {
  const source = fs.readFileSync(path.join(projectRoot, fileName), 'utf8');
  const output = englishHtml(source, fileName);
  fs.writeFileSync(path.join(outputDirectory, fileName), output, 'utf8');
}
