// Asamblează pagina din bucățile din src/ (ordinea e în src/manifest.json).
//   index.html          pagina completă (GitHub Pages, deschidere locală)
//   dist/artifact.html  aceeași pagină fără scheletul de document, pentru artifactul claude.ai
// Rulare: node build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const man = JSON.parse(fs.readFileSync(path.join(root, 'src/manifest.json'), 'utf8'));
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const page = man.page.map(read).join('\n');
const full = man.doc.map(read).join('\n') + '\n' + page + '\n\n' + man.docEnd.map(read).join('\n');
fs.writeFileSync(path.join(root, 'index.html'), full);
fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
fs.writeFileSync(path.join(root, 'dist/artifact.html'), page);
console.log('index.html', (Buffer.byteLength(full) / 1024).toFixed(1) + ' KB');
