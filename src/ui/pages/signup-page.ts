import { type Locator, type Page } from '@playwright/test';
import { CreateUserRequest } from '../../api/models/requests/create-user.request';
import { BasePage } from './base-page';
export class SignupPage extends BasePage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly daysSelect: Locator;
  readonly monthsSelect: Locator;
  readonly yearsSelect: Locator;
  readonly newsletterCheckbox: Locator;
  readonly specialOffersCheckbox: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly addressInput: Locator;
  readonly address2Input: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly createAccountButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.nameInput = this.page.locator('input[name="name"]');
    this.emailInput = this.page.locator('input[name="email"]');
    this.passwordInput = this.page.getByRole('textbox', { name: 'Password *' });
    this.daysSelect = this.page.locator('#days');
    this.monthsSelect = this.page.locator('#months');
    this.yearsSelect = this.page.locator('#years');
    this.newsletterCheckbox = this.page.getByRole('checkbox', {
      name: 'Sign up for our newsletter!',
    });
    this.specialOffersCheckbox = this.page.getByRole('checkbox', {
      name: 'Receive special offers from',
    });
    this.firstNameInput = this.page.getByRole('textbox', {
      name: 'First name *',
    });
    this.lastNameInput = this.page.getByRole('textbox', {
      name: 'Last name *',
    });
    this.companyInput = this.page.getByRole('textbox', {
      name: 'Company',
      exact: true,
    });
    this.addressInput = this.page.locator('input[name="address1"]');
    this.address2Input = this.page.getByRole('textbox', { name: 'Address 2' });
    this.stateInput = this.page.getByRole('textbox', { name: 'State *' });
    this.cityInput = this.page.locator('input[name="city"]');
    this.zipcodeInput = this.page.locator('#zipcode');
    this.mobileNumberInput = this.page.getByRole('textbox', {
      name: 'Mobile Number *',
    });
    this.createAccountButton = this.page.getByRole('button', {
      name: 'Create Account',
    });
  }

  async fillAndSubmit(user: CreateUserRequest) {
    await this.page.getByRole('radio', { name: `${user.title}.` }).check();
    await this.passwordInput.fill(user.password);
    await this.daysSelect.selectOption(user.birth_date.toString());
    await this.monthsSelect.selectOption(user.birth_month.toString());
    await this.yearsSelect.selectOption(user.birth_year.toString());
    await this.newsletterCheckbox.check();
    await this.specialOffersCheckbox.check();
    await this.firstNameInput.fill(user.firstname);
    await this.lastNameInput.fill(user.lastname);
    await this.companyInput.fill(user.company);
    await this.addressInput.fill(user.address1);
    await this.address2Input.fill(user.address2);
    await this.stateInput.fill(user.state);
    await this.cityInput.fill(user.city);
    await this.zipcodeInput.fill(user.zipcode);
    await this.mobileNumberInput.fill(user.mobile_number);
    await Promise.all([
      this.page.waitForURL(/\/account_created/),
      this.createAccountButton.click(),
    ]);
  }
}