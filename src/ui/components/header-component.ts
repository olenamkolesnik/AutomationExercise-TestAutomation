import { expect, type Locator, type Page } from '@playwright/test';

export class HeaderComponent {
  readonly page: Page;
  readonly headerLocator: Locator;
  constructor(page: Page) {
    this.page = page;
    this.headerLocator = page.locator('header');
  }

  async assertAriaStructure() {
    await expect(this.headerLocator).toMatchAriaSnapshot(`
    - banner:
      - link "Website for automation practice":
        - /url: /
        - img "Website for automation practice"
      - list:
        - listitem:
          - link " Home":
            - /url: /
        - listitem:
          - link " Products":
            - /url: /products
        - listitem:
          - link " Cart":
            - /url: /view_cart
        - listitem:
          - link " Signup / Login":
            - /url: /login
        - listitem:
          - link " Test Cases":
            - /url: /test_cases
        - listitem:
          - link " API Testing":
            - /url: /api_list
        - listitem:
          - link " Video Tutorials":
            - /url: https://www.youtube.com/c/AutomationExercise
        - listitem:
          - link " Contact us":
            - /url: /contact_us`);
  }
}
