const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  use: { headless: true, viewport: { width: 1280, height: 900 }, timezoneId: 'America/New_York' },
  reporter: 'list',
});
