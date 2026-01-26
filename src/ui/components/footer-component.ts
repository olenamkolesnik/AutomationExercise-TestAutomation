import { type Locator, type Page } from '@playwright/test';

export class FooterComponent {
  readonly footer: Locator;
  readonly copyright: Locator;
  readonly subscriptionText: Locator;
  readonly subscribeInput: Locator;
  readonly subscribeButton: Locator;

  constructor(page: Page) {
    this.footer = page.locator('#footer');
    this.subscribeInput = page.locator('#susbscribe_email');
    this.subscribeButton = page.locator('#subscribe');
    this.copyright = page.getByText(/Copyright © \d{4} All rights/);
    this.subscriptionText = page.getByText(`Get the most recent updates from our site and be updated your self...`);
  }

  accessibilityContract(): string {
    return `
      - contentinfo:
        - heading "Subscription" [level=2]
        - textbox "Your email address"
        - button
      `;
  }
}
