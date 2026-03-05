import { expect, type Page } from '@playwright/test';

import { User } from '../../common/models/product/user.model';
import { BasePage } from './base-page';
export class SignupPage extends BasePage {
  private readonly nameInput = this.page.locator('input[name="name"]');
  private readonly emailInput = this.page.locator('input[name="email"]');
  private readonly passwordInput = this.page.getByRole('textbox', {
    name: 'Password *',
  });
  private readonly daysSelect = this.page.locator('#days');
  private readonly monthsSelect = this.page.locator('#months');
  private readonly yearsSelect = this.page.locator('#years');
  private readonly newsletterCheckbox = this.page.getByRole('checkbox', {
    name: 'Sign up for our newsletter!',
  });
  private readonly specialOffersCheckbox = this.page.getByRole('checkbox', {
    name: 'Receive special offers from',
  });
  private readonly firstNameInput = this.page.getByRole('textbox', {
    name: 'First name *',
  });
  private readonly lastNameInput = this.page.getByRole('textbox', {
    name: 'Last name *',
  });
  private readonly companyInput = this.page.getByRole('textbox', {
    name: 'Company',
    exact: true,
  });
  private readonly addressInput = this.page.locator('input[name="address1"]');
  private readonly address2Input = this.page.getByRole('textbox', {
    name: 'Address 2',
  });
  private readonly stateInput = this.page.getByRole('textbox', {
    name: 'State *',
  });
  private readonly cityInput = this.page.locator('input[name="city"]');
  private readonly zipcodeInput = this.page.locator('#zipcode');
  private readonly mobileNumberInput = this.page.getByRole('textbox', {
    name: 'Mobile Number *',
  });
  private readonly createAccountButton = this.page.getByRole('button', {
    name: 'Create Account',
  });

  constructor(page: Page) {
    super(page);
  }

  async expectOpened() {
    await expect(this.page).toHaveURL(/\/signup/);
    await expect(this.createAccountButton).toBeVisible();
  }

  async fillSignupForm(user: User) {
    await this.page.getByRole('radio', { name: `${user.title}.` }).check();
    await this.passwordInput.fill(user.password);
    await this.daysSelect.selectOption(user.birthDate.day.toString());
    await this.monthsSelect.selectOption(user.birthDate.month.toString());
    await this.yearsSelect.selectOption(user.birthDate.year.toString());
    await this.newsletterCheckbox.check();
    await this.specialOffersCheckbox.check();
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.companyInput.fill(user.company?? '');
    await this.addressInput.fill(user.address?.line1 ?? '');
    await this.address2Input.fill(user.address?.line2 ?? '');
    await this.stateInput.fill(user.address?.state ?? '');
    await this.cityInput.fill(user.address?.city ?? '');
    await this.zipcodeInput.fill(user.address?.zipCode ?? '');
    await this.mobileNumberInput.fill(user.mobileNumber ?? '');
  }

  async submitSignupForm() {
    await Promise.all([
      this.page.waitForURL(/\/account_created/),
      this.createAccountButton.click(),
    ]);
  }
}
