import { expect } from '@playwright/test';
import { DeliveryAddressUi } from '../models/delivery-address.model';
import { User } from '../../common/models/product/user.model';
export function assertDeliveryAddress(
  deliveryAddressUi: DeliveryAddressUi,
  person: User,
) {
  expect(deliveryAddressUi.firstNamelastName).toContain(person.title);
  expect(deliveryAddressUi.firstNamelastName).toContain(person.firstName);
  expect(deliveryAddressUi.firstNamelastName).toContain(person.lastName);
  expect(deliveryAddressUi.address1address2).toContain(person.company);
  expect(deliveryAddressUi.address1address2).toContain(person.address?.line1);
  if (person.address?.line2)
    expect(deliveryAddressUi.address1address2).toContain(person.address?.line2);
  expect(deliveryAddressUi.cityStatePostcode).toContain(person.address?.city);
  expect(deliveryAddressUi.cityStatePostcode).toContain(person.address?.state);
  expect(deliveryAddressUi.cityStatePostcode).toContain(person.address?.zipCode);
  expect(deliveryAddressUi.country).toBe(person.address?.country);
  expect(deliveryAddressUi.phone).toBe(person.mobileNumber);
}
