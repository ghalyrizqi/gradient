import { build } from 'esbuild';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

await Promise.all(
  ['seed', 'color', 'text', 'image'].map(name =>
    build({
      entryPoints: [resolve(root, `api/gradient/${name}.ts`)],
      bundle: true,
      platform: 'node',
      target: ['node20'],
      format: 'esm',
      outfile: resolve(root, `api/gradient/${name}.js`),
    }),
  ),
);

console.log('api bundles built');
