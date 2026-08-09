import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, 'dist');
const client = join(dist, 'client');
const server = join(dist, 'server');

await rm(dist, { recursive: true, force: true });
await mkdir(client, { recursive: true });
await mkdir(server, { recursive: true });

const assets = [
  'index.html',
  'hero.css',
  'hero-app.jsx',
  'three-layer.js',
  'hero-concept.png',
  'lyuba-hero-final.mp4',
  'lyuba-ambient.m4a',
];

for (const asset of assets) {
  await cp(join(root, asset), join(client, asset));
}

await writeFile(join(server, 'index.js'), `
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/') {
      url.pathname = '/index.html';
      request = new Request(url, request);
    }
    return env.ASSETS.fetch(request);
  }
};
`.trimStart());

console.log('Site build ready');
