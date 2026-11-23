// @ts-check
const { defineConfig, devices } = require('@playwright/test');

// CHROMIUM_PATH permite usar un Chromium ya instalado (útil sin acceso a la descarga de Playwright).
const executablePath = process.env.CHROMIUM_PATH || undefined;

module.exports = defineConfig({
  testDir: './tests',
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://127.0.0.1:8080',
    launchOptions: { executablePath },
  },
  projects: [
    { name: 'escritorio', use: { ...devices['Desktop Chrome'], launchOptions: { executablePath } } },
    { name: 'movil', use: { ...devices['Pixel 7'], launchOptions: { executablePath } } },
  ],
  webServer: {
    command: 'npx http-server -p 8080 -s -c-1 .',
    url: 'http://127.0.0.1:8080',
    reuseExistingServer: !process.env.CI,
  },
});
