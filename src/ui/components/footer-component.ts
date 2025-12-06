import { expect, type Locator, type Page } from '@playwright/test';

export class FooterComponent {
  readonly page: Page;
  readonly footerLocator: Locator;
  constructor(page: Page) {
    this.page = page;
    this.footerLocator = page.locator('#footer');
  }
  async assertAriaStructure() {
    await expect(this.footerLocator).toMatchAriaSnapshot(`
      - contentinfo:
        - heading "Subscription" [level=2]
        - textbox "Your email address"
        - button
        - paragraph: Get the most recent updates from our site and be updated your self...
        - paragraph: /Copyright © \\d+ All rights reserved/
      `);
  };
}
