import { expect } from '@playwright/test';
import { SignupPage } from '../pages/signup-page';

export class SignupPageAssert {
  constructor(private readonly page: SignupPage) {}

  async isOpened() {
      expect(await this.page.getUrl()).toMatch(/\/signup/);
      expect(await this.page.getTitle()).toBe('Automation Exercise - Signup');
  }
}