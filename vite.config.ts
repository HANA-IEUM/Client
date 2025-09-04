/// <reference types="vitest/config" />
import path from 'path';
import { fileURLToPath } from 'url';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      // 앱 새 버전 자동 업데이트
      manifest: {
        name: '하나이음',
        short_name: '하나이음',
        description: '가족과 함께 모으는 금융, 함께 이루는 버킷리스트',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      injectRegister: 'auto',
      devOptions: {
        enabled: true, // 개발 환경에서도 PWA 테스트 가능
      },
      strategies: 'generateSW',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    projects: [
      {
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(__dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});
