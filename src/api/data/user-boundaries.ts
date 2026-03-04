import { buildUser } from './user-factory';

export const boundaryUsers = {
  dobMinYear: () =>
    buildUser({ birthDate: { day: 1, month: 1, year: 1900 } }),

  dobMaxYear: () => {
    const year = new Date().getFullYear() - 18;
    return buildUser({ birthDate : { day: 1, month: 1, year } });
  },

  longStrings: () => {
    const long = 'A'.repeat(255);
    return buildUser({
      firstName: long,
      lastName: long,
      company: long,
      address: {
        line1: long,
        country: long,
        state: long,
        city: long,
        zipCode: long,
      }
    });
  },

  rareCharacters: () => {
    return buildUser({
      firstName: "Jean-Luc",
      lastName: "O’Connor",
      company: "Müller & Söhne",
    });
  }
};