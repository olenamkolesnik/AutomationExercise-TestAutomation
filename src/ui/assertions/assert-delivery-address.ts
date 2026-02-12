import { expect } from '@playwright/test';
import { DeliveryAddressUi } from '../models/delivery-address.model';
import { CreateUserRequest } from '../../api/models/requests/create-user.request';
export function assertDeliveryAddress(
  deliveryAddressUi: DeliveryAddressUi,
  person: CreateUserRequest,
) {
  expect(deliveryAddressUi.firstNamelastName).toContain(person.title);
  expect(deliveryAddressUi.firstNamelastName).toContain(person.firstname);
  expect(deliveryAddressUi.firstNamelastName).toContain(person.lastname);
  expect(deliveryAddressUi.address1address2).toContain(person.company);
  expect(deliveryAddressUi.address1address2).toContain(person.address1);
  if (person.address2)
    expect(deliveryAddressUi.address1address2).toContain(person.address2);
  expect(deliveryAddressUi.cityStatePostcode).toContain(person.city);
  expect(deliveryAddressUi.cityStatePostcode).toContain(person.state);
  expect(deliveryAddressUi.cityStatePostcode).toContain(person.zipcode);
  expect(deliveryAddressUi.country).toBe(person.country);
  expect(deliveryAddressUi.phone).toBe(person.mobile_number);
}
