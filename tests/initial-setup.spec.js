// initial-setup.spec.js

// Import the test and expect functions from the Playwright test runner.
// These are the core components for defining and asserting tests.
const { test, expect } = require('@playwright/test');

// The 'describe' block is used to group related tests.
// Here, we're grouping tests related to verifying the Playwright setup.
test.describe('Playwright Initial Setup Verification', () => {

  // Test 1: Verify basic navigation and page title
  // 'test' defines an individual test case.
  // The first argument is a descriptive name for the test.
  // The second argument is an async function that contains the test logic.
  // '{ page }' is a Playwright fixture that provides a Page object,
  // allowing interaction with the browser page.
  test('should navigate to Hacker News and verify the page title', async ({ page }) => {
    // Navigate to the specified URL.
    await page.goto('https://news.ycombinator.com/newest');

    // Assert that the page title contains the expected text.
    // 'expect(page).toHaveTitle()' is a built-in Playwright assertion.
    await expect(page.locator(".hnname").first()).toContainText(/Hacker News/);
    console.log('Test 1 Passed: Page title verified.');
  });

  // Test 2: Verify visibility of key navigation buttons on the page
  test('should verify the key navigation buttons is visible on Hacker News', async ({ page }) => {
    await page.goto('https://news.ycombinator.com/newest');

    // Assert that key navigation element identified are visible and correct.
    await expect(page.locator('.pagetop a').nth(1)).toContainText("new");
    await expect(page.locator('.pagetop a').nth(2)).toContainText("past");
    await expect(page.locator('.pagetop a').nth(3)).toContainText("comments");
    await expect(page.locator('.pagetop a').nth(4)).toContainText("ask");
    await expect(page.locator('.pagetop a').nth(5)).toContainText("show");
    await expect(page.locator('.pagetop a').nth(6)).toContainText("jobs");
    await expect(page.locator('.pagetop a').nth(7)).toContainText("submit");

    console.log('Test 2 Passed: Key navigation buttons are visible.');
  });

  // Test 3: Simulate a basic interaction
  test('should perform a basic interaction between buttons', async ({ page }) => {
    await page.goto('https://news.ycombinator.com/newest');

    // --- Navigate to 'front' ---
    page.locator('.pagetop a:has-text("new")').nth(0)
    .click()
    const linkLocator = page.locator('.pagetop a:has-text("past")').first();
    await linkLocator.click();
    await expect(page).toHaveURL(/front/, { timeout: 10000 }); // Increase timeout for URL navigation
    await expect(page.getByText(/Go back a day, month, or year./)).toBeVisible({ timeout: 10000 });

    // --- Navigate to 'newcomments' ---
    page.locator('.pagetop a:has-text("new")').nth(0)
    .click()
    const linkLocator2 = page.locator('.pagetop a:has-text("comments")').first();
    await linkLocator2.click();
    await expect(page).toHaveURL(/newcomments/, { timeout: 10000 }); // Increase timeout for URL navigation
    await expect(page.locator('.topsel a').first()).toHaveText(/comments/, { timeout: 10000 }); // Increase timeout for URL navigation
    await expect(page.getByText(/parent/).first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/context/).first()).toBeVisible({ timeout: 10000 });

    // --- Navigate to 'ask' ---
    page.locator('.pagetop a:has-text("new")').nth(0)
    .click()
    const linkLocator3 = page.locator('.pagetop a:has-text("ask")').first();
    await linkLocator3.click();
    await expect(page).toHaveURL(/ask/, { timeout: 10000 }); // Increase timeout for URL navigation
    await expect(page.locator('.topsel a').first()).toHaveText(/ask/, { timeout: 10000 }); // Increase timeout for URL navigation
    await expect(page.getByText(/points? by/).first()).toBeVisible({ timeout: 10000 });

    // --- Navigate to 'show' ---
    page.locator('.pagetop a:has-text("new")').nth(0)
    .click()
    const linkLocator4 = page.locator('.pagetop a:has-text("show")').first();
    await linkLocator4.click();
    await expect(page).toHaveURL(/show/, { timeout: 10000 }); // Increase timeout for URL navigation
    await expect(page.locator('.topsel a').first()).toHaveText(/show/, { timeout: 10000 }); // Increase timeout for URL navigation
    await expect(page.getByText(/Please read the Show HN rules and tips before posting./).first()).toBeVisible({ timeout: 10000 });

    // --- Navigate to 'jobs' ---
    page.locator('.pagetop a:has-text("new")').nth(0)
    .click()
    const linkLocator5 = page.locator('.pagetop a:has-text("jobs")').first();
    await linkLocator5.click();
    await expect(page).toHaveURL(/jobs/, { timeout: 10000 }); // Increase timeout for URL navigation
    await expect(page.locator('.topsel a').first()).toHaveText(/jobs/, { timeout: 10000 }); // Increase timeout for URL navigation
    await expect(page.getByText(/These are jobs at YC startups/).first()).toBeVisible({ timeout: 10000 });

    // --- Navigate to 'new' ---
    page.locator('.pagetop a:has-text("new")').nth(0)
    .click()
    const linkLocator6 = page.locator('.pagetop a:has-text("new")').nth(1);
    await linkLocator6.click();
    await expect(page).toHaveURL(/newest/, { timeout: 10000 }); // Increase timeout for URL navigation
    await expect(page.locator('.topsel a').first()).toHaveText(/new/, { timeout: 10000 }); // Increase timeout for URL navigation
    page.locator('.pagetop a:has-text("new")').nth(1)
    await expect(page.getByText(/points? by/).first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/hide/).first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/past/).first()).toBeVisible({ timeout: 10000 });

    // --- Click the 'more' button ---
    await expect(page.getByText(/1\./).first()).toBeVisible({ timeout: 10000 });
    const linkLocator7 = page.locator('.morelink').first();
    await linkLocator7.click();
    await expect(page.getByText(/31\./).first()).toBeVisible({ timeout: 10000 });
    await linkLocator7.click();
    await expect(page.getByText(/61\./).first()).toBeVisible({ timeout: 10000 });
    await linkLocator7.click();
    await expect(page.getByText(/91\./).first()).toBeVisible({ timeout: 10000 });
    await linkLocator7.click();
    await expect(page.getByText(/121\./).first()).toBeVisible({ timeout: 10000 });


    // --- Navigate to 'submit' ---
    page.locator('.pagetop a:has-text("new")').nth(0)
    .click()
    const linkLocator8 = page.locator('.pagetop a:has-text("submit")').first();
    await linkLocator8.click();
    await expect(page).toHaveURL(/submit/, { timeout: 10000 }); // Increase timeout for URL navigation

    console.log('Test 3 Passed: Basic button navigation interaction.');
  });
});