import { type Locator, type Page } from '@playwright/test';

export class HeaderComponent {
  readonly headerLocator: Locator;
  bannerLink: Locator;
  homeLink: Locator;
  productsLink: Locator;
  cartLink: Locator;
  signupLoginLink: Locator;
  testCasesLink: Locator;
  apiTestingLink: Locator;
  videoTutorialsLink: Locator;
  contactUsLink: Locator;
   readonly navigationLinks: { locator: Locator; href: string }[];

  constructor(page: Page) {
    this.headerLocator = page.locator('header');
    this.bannerLink = page.getByRole('link', {
      name: 'Website for automation practice',
    });
    this.homeLink = page.getByRole('link', { name: 'Home' });
    this.productsLink = page.getByRole('link', { name: 'Products' });
    this.cartLink = page.getByRole('link', { name: 'Cart' });
    this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });
    this.testCasesLink = page.getByRole('link', { name: 'Test Cases' });
    this.apiTestingLink = page.getByRole('link', { name: 'API Testing' });
    this.videoTutorialsLink = page.getByRole('link', {
      name: 'Video Tutorials',
    });
    this.contactUsLink = page.getByRole('link', { name: 'Contact us' });

    this.navigationLinks = [
      { locator: this.homeLink, href: '/' },
      { locator: this.productsLink, href: '/products' },
      { locator: this.cartLink, href: '/view_cart' },
      { locator: this.signupLoginLink, href: '/login' },
      { locator: this.testCasesLink, href: '/test_cases' },
      { locator: this.apiTestingLink, href: '/api_list' },
      {
        locator: this.videoTutorialsLink,
        href: 'https://www.youtube.com/c/AutomationExercise',
      },
      { locator: this.contactUsLink, href: '/contact_us' },
    ];
  }

  accessibilityContract(): string {
    return `
    - banner:
      - link "Website for automation practice":
        - img "Website for automation practice"
      - list:
        - listitem:
          - link " Home"
        - listitem:
          - link " Products"
        - listitem:
          - link " Cart"
        - listitem:
          - link " Signup / Login"
        - listitem:
          - link " Test Cases"
        - listitem:
          - link " API Testing"
        - listitem:
          - link " Video Tutorials"
        - listitem:
          - link " Contact us"
`;
  }
}
