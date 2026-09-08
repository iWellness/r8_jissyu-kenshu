import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');

async function filesWithin(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? filesWithin(target) : [target];
  }));
  return nested.flat();
}

function localTarget(htmlFile, reference) {
  const clean = reference.split(/[?#]/, 1)[0];
  if (!clean || clean.startsWith('http:') || clean.startsWith('https:') || clean.startsWith('mailto:')) return null;
  if (clean.startsWith('/r8_jissyu-kenshu/')) return path.join(root, clean.slice('/r8_jissyu-kenshu/'.length));
  if (clean.startsWith('/')) return null;
  return path.resolve(path.dirname(htmlFile), clean);
}

async function existsAsPage(target) {
  const candidates = path.extname(target) ? [target] : [target, `${target}.html`, path.join(target, 'index.html')];
  for (const candidate of candidates) {
    try { await access(candidate); return true; } catch { /* try next */ }
  }
  return false;
}

const htmlFiles = (await filesWithin(root)).filter((file) => file.endsWith('.html'));
const failures = [];
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const h1Count = (html.match(/<h1\b/g) ?? []).length;
  if (h1Count !== 1) failures.push(`${path.relative(root, file)} contains ${h1Count} h1 elements`);

  const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map((match) => match[1]);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  for (const id of new Set(duplicateIds)) failures.push(`${path.relative(root, file)} contains duplicate id #${id}`);
  for (const match of html.matchAll(/href=["']#([^"']+)["']/g)) {
    if (!ids.includes(match[1])) failures.push(`${path.relative(root, file)} -> missing #${match[1]}`);
  }

  for (const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
    const target = localTarget(file, match[1]);
    if (target && !(await existsAsPage(target))) failures.push(`${path.relative(root, file)} -> ${match[1]}`);
  }
}
if (failures.length) {
  console.error(`Broken internal references:\n${failures.join('\n')}`);
  process.exit(1);
}
console.log(`Checked ${htmlFiles.length} HTML files.`);
