import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import compression from 'vite-plugin-compression';
import imagemin from 'vite-plugin-imagemin';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isProduction = mode === 'production';

  return {
    root: process.cwd(),
    publicDir: 'public',
    build: {
      target: 'esnext',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug'],
        },
        mangle: true,
        format: {
          comments: false,
        },
      },
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
        },
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react/jsx-runtime'],
            'ui-vendor': ['@headlessui/react', '@heroicons/react'],
            'i18n-vendor': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
            'utils-vendor': ['lodash', 'date-fns'],
          },
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(assetInfo.name)) {
              return `assets/images/[name]-[hash][extname]`;
            }
            if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
              return `assets/fonts/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
        },
      },
      chunkSizeWarningLimit: 1000,
      assetsDir: 'assets',
      emptyOutDir: true,
      copyPublicDir: true,
      sourcemap: !isProduction,
    },
    plugins: [
      react({
        babel: {
          plugins: [
            ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
            ['@babel/plugin-transform-runtime', { regenerator: true }],
          ],
        },
      }),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
          name: 'قوَى نَجْد للاستشارات الهندسية',
          short_name: 'قوَى نَجْد',
          description:
            'شركة رائدة في مجال التصميم والبناء، نسعى دائماً لتقديم أفضل الخدمات لعملائنا الكرام',
          theme_color: '#F03E2F',
          background_color: '#ffffff',
          display: 'standalone',
          orientation: 'portrait',
          start_url: '/',
          scope: '/',
          icons: [
            {
              src: '/assets/images/logo/Capture.webp',
              sizes: '192x192 512x512',
              type: 'image/webp',
              purpose: 'any maskable',
            },
          ],
          dir: 'rtl',
          lang: 'ar',
        },
        workbox: {
          globPatterns: [
            '**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,webp,avif,woff,woff2,eot,ttf,otf}',
          ],
          disableDevLogs: true,
          navigateFallback: null,
          cleanupOutdatedCaches: true,
          clientsClaim: !isProduction,
          skipWaiting: !isProduction,
          // Add better error handling for cache operations
          mode: isProduction ? 'production' : 'development',
          sourcemap: !isProduction,
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/www\.google-analytics\.com\/.*/i,
              handler: 'NetworkOnly',
            },
            {
              urlPattern: /^https:\/\/www\.googletagmanager\.com\/.*/i,
              handler: 'NetworkOnly',
            },
            {
              urlPattern: /^https:\/\/www\.google\.com\.eg\/ads\/.*/i,
              handler: 'NetworkOnly',
            },
          ],
        },
        devOptions: {
          enabled: env.VITE_ENABLE_SW_DEV === 'true' && !isProduction,
          type: 'module',
          navigateFallback: undefined,
          // Add error handling for development
          suppressWarnings: true,
          disableDevLogs: true,
        },
      }),
      compression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 1024,
        deleteOriginalAssets: false,
        compressionOptions: {
          level: 9,
        },
      }),
      compression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 1024,
        deleteOriginalAssets: false,
        compressionOptions: {
          level: 11,
        },
      }),
      imagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false,
        },
        optipng: {
          optimizationLevel: 7,
        },
        mozjpeg: {
          quality: 80,
          progressive: true,
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4,
        },
        svgo: {
          plugins: [
            {
              name: 'removeViewBox',
            },
            {
              name: 'removeEmptyAttrs',
              active: false,
            },
          ],
        },
        webp: {
          quality: 80,
          method: 6,
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@styles': path.resolve(__dirname, './src/styles'),
        '@lib': path.resolve(__dirname, './src/lib'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@utils': path.resolve(__dirname, './src/utils'),
      },
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@headlessui/react',
        '@heroicons/react',
        'i18next',
        'react-i18next',
        'i18next-browser-languagedetector',
        'lodash',
        'date-fns',
      ],
      exclude: [],
      force: true,
    },
    server: {
      port: 4000,
      strictPort: false,
      host: true,
      open: true,
      cors: true,
      hmr: {
        overlay: true,
      },
    },
  };
});
