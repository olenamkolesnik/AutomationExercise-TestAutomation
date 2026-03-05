import { faker } from '@faker-js/faker';

import { Card } from '../models/card.model';

export type CardOverrides = Partial<Card>;

export function buildValidCard(overrides: CardOverrides = {}): Card {
  const date = generateFutureExpiration();

  const card: Card = {
    nameOnCard: faker.person.fullName(),
    cardNumber: faker.finance.creditCardNumber({issuer : 'visa'}),
    cvc: faker.finance.creditCardCVV(),

    expirationMonthMM: date.month,
    expirationYearYYYY: date.year,
  };

  return { ...card, ...overrides } as Card;
}
 function generateFutureExpiration(): { month: string; year: number } {
  const date = faker.date.future({ years: 1 });
  return {
    month: String(date.getMonth() + 1).padStart(2, '0'),
    year: date.getFullYear(),
  };
}
