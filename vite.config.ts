import { defineConfig, type Plugin, type Connect } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// Mirrors vercel.json's `rewrites` so `npm run dev` / `npm run preview`
// resolve the same clean URLs as production. Keep in sync with vercel.json.
// `index.html` IS the landing page (the literal default document Vercel/Vite
// serve for `/`), so `/` needs no rewrite at all — only the other 3 routes do.
const CLEAN_URL_MAP: Record<string, string> = {
  '/docs': '/docs.html',
  '/studio': '/studio.html',
  '/showcase': '/marketing.html',
};

function cleanUrlRewritePlugin(): Plugin {
  const rewrite: Connect.NextHandleFunction = (req, _res, next) => {
    if (!req.url) return next();
    const [pathname, search = ''] = req.url.split('?');
    const query = search ? `?${search}` : '';

    if (pathname in CLEAN_URL_MAP) {
      req.url = CLEAN_URL_MAP[pathname] + query;
    } else if (
      pathname !== '/' &&
      !pathname.startsWith('/src/') &&
      !pathname.startsWith('/@') &&
      !pathname.startsWith('/node_modules/') &&
      !pathname.startsWith('/api/') &&
      !/\.[a-zA-Z0-9]+$/.test(pathname) // real files (assets, favicon.svg, etc.) pass through
    ) {
      // Catch-all: unmatched non-file paths -> index.html (landing), mirrors
      // vercel.json's `/((?!api/).*)` rewrite (soft-fallback to landing).
      req.url = '/index.html' + query;
    }
    next();
  };

  return {
    name: 'clean-url-rewrite',
    configureServer(server) {
      server.middlewares.use(rewrite);
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewrite);
    },
  };
}

export default defineConfig({
  plugins: [vue(), cleanUrlRewritePlugin()],
  build: {
    rollupOptions: {
      input: {
        landing:   resolve(__dirname, 'index.html'),
        studio:    resolve(__dirname, 'studio.html'),
        docs:      resolve(__dirname, 'docs.html'),
        marketing: resolve(__dirname, 'marketing.html'),
      },
    },
  },
});
