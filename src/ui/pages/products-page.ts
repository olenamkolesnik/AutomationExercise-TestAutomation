import { expect, type Page } from '@playwright/test';

import { logger } from '../../common/utils/logger';
import { BasePage } from './base-page';

export class ProductsPage extends BasePage {
  private readonly searchProduct = this.page.getByPlaceholder('Search Product');
  private readonly searchButton = this.page.locator('#submit_search');
  private readonly productCards = this.page.locator('.product-image-wrapper');
  private readonly viewCartLink = this.page.getByRole('link', {
    name: 'View Cart',
  });

  constructor(page: Page) {
    super(page);
  }

  async navigateToProducts() {
    await this.page.goto('/products');
    await this.expectOpened();
    logger.info('Navigated to products page and verified that it is opened');
  }

  async searchForProduct(productName: string) {
    logger.info(`Searching for product with name "${productName}"`);
    await this.searchProduct.fill(productName);
    await this.searchButton.click();
  }

  async addProductToCartByName(productName: string) {
    logger.info(`Adding product with name "${productName}" to cart`);
    const card = this.productCards.filter({ hasText: productName });
    await card.scrollIntoViewIfNeeded();

    await card.hover();

    const addToCartButton = card.locator('.product-overlay a.add-to-cart');
    await addToCartButton.click();
  }

  async viewCart() {
    await this.viewCartLink.click();
  }

  async expectOpened() {
    await expect(this.page).toHaveURL(/\/products/);
    logger.info('Products page is opened with correct URL');
  }
}
