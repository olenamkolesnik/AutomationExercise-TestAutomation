import { buildUser } from './user-factory';

export const boundaryUsers = {
  dobMinYear: () =>
    buildUser({ birth_year: 1900 }),

  dobMaxYear: () => {
    const year = new Date().getFullYear() - 18;
    return buildUser({ birth_year: year });
  },

  longStrings: () => {
    const long = 'A'.repeat(255);
    return buildUser({
      firstname: long,
      lastname: long,
      company: long,
      address1: long,
      city: long,
    });
  },

  rareCharacters: () => {
    return buildUser({
      firstname: "Jean-Luc",
      lastname: "O’Connor",
      company: "Müller & Söhne",
    });
  }
};