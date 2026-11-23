// @ts-check
const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

const WCAG_22_AA = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test('la página no tiene errores de accesibilidad (WCAG 2.2 AA)', async ({ page }) => {
  await page.goto('/');
  const { violations } = await new AxeBuilder({ page }).withTags(WCAG_22_AA).analyze();
  expect(violations.map(v => `${v.id}: ${v.help}`)).toEqual([]);
});

test('no hay errores de JavaScript al cargar', async ({ page }) => {
  const errores = [];
  page.on('pageerror', e => errores.push(e.message));
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  expect(errores).toEqual([]);
});

test('se puede hacer zoom: el viewport no lo bloquea', async ({ page }) => {
  await page.goto('/');
  const viewport = await page.getAttribute('meta[name="viewport"]', 'content');
  expect(viewport).not.toMatch(/user-scalable\s*=\s*no|maximum-scale\s*=\s*1(\.0)?\b/);
});

test('el pop-up de preventa se abre, pasa axe y se cierra con Escape', async ({ page }) => {
  await page.goto('/');
  const dialogo = page.locator('#preventa');
  await expect(dialogo).toBeVisible();
  const { violations } = await new AxeBuilder({ page }).withTags(WCAG_22_AA).analyze();
  expect(violations.map(v => `${v.id}: ${v.help}`)).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(dialogo).not.toBeVisible();
});
