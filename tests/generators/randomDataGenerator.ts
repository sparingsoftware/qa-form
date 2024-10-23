import { faker } from '@faker-js/faker';

export class DataGenerator {
  static getRandomFirstName(): string {
    return faker.person.firstName();
  }

  static getRandomLastName(): string {
    return faker.person.lastName();
  }

  static getRandomEmail(): string {
    return faker.internet.email();
  }

  static getRandomPassword(): string {
    let password = '';
    while (
      !(
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /\d/.test(password) &&
        /[!@#$%^&*()_+]/.test(password)
      )
    ) {
      password = faker.internet.password({
        length: 10,
        memorable: false,
        pattern: /[A-Za-z0-9!@#$%^&*()_+]/,
        prefix: '',
      });
    }
    return password;
  }

  static getRandomDateOfBirth(): string {
    const minAge = 18;
    const maxAge = 65;
    const birthDate = faker.date.birthdate({ min: minAge, max: maxAge, mode: 'age' });
    return birthDate.toISOString().split('T')[0];
  }

  static getRandomPhoneNumber(): string {
    return faker.string.numeric(9);
  }

  static getRandomLanguageCode(): string {
    const languageCodes = ['pl', 'en', 'de', 'fr', 'es', 'it', 'ru'];
    return faker.helpers.arrayElement(languageCodes);
  }

  static getInvalidEmail(): string {
    return faker.word.sample(5);
  }

  static getInvalidPassword(): string {
    return 'abc';
  }

  static getMismatchedPassword(validPassword: string): string {
    return validPassword + '1';
  }

  static getInvalidPhoneNumber(): string {
    return 'abc123';
  }

  static getShortPhoneNumber(): string {
    return faker.string.numeric(5);
  }

  static getInvalidFirstName(): string {
    return faker.string.alphanumeric(10);
  }

  static getInvalidLastName(): string {
    return faker.word.sample() + '!';
  }

  static getWeakPassword(criteria: string): string {
    switch (criteria) {
      case 'length':
        return 'A1!';
      case 'uppercase':
        return 'haslo123!';
      case 'number':
        return 'Hasloabc!';
      case 'special':
        return 'Haslo1234';
      default:
        return 'password';
    }
  }
}
