import { Locator, expect } from '@playwright/test';
import { DeliveryAddressUi } from '../models/delivery-address.model';

export class DeliveryAddressComponent {
  constructor(private readonly root: Locator) {}

  async getData(): Promise<DeliveryAddressUi> {
    await expect(this.root).toBeVisible();
    const address = (
      await this.root
        .locator('.address_address1.address_address2')
        .allTextContents()
    )
      .map((v) => v.trim())
      .join(' ');

    return {
      firstNamelastName: await this.root
        .locator('.address_firstname.address_lastname')
        .innerText(),
      address1address2: address,
      cityStatePostcode: await this.root
        .locator('.address_city.address_state_name.address_postcode')
        .innerText(),
      country: await this.root.locator('.address_country_name').innerText(),
      phone: await this.root.locator('.address_phone').innerText(),
    };
  }
}
