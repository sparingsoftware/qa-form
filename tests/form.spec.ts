import { test, expect } from '@playwright/test';
import { FormPage } from './pages/Form';
import { DataGenerator } from './generators/randomDataGenerator';
import { validationMessages, successMessages } from './consts/definitions';

test.describe('Form Tests', () => {
  let formPage: FormPage;

  test.beforeEach(async ({ page }) => {
    formPage = new FormPage(page);
    await formPage.navigate();
  });

  test('Should submit the form with valid random data and display success messages', async () => {
    const firstName = DataGenerator.getRandomFirstName();
    const lastName = DataGenerator.getRandomLastName();
    const email = DataGenerator.getRandomEmail();
    const password = DataGenerator.getRandomPassword();
    const dateOfBirth = DataGenerator.getRandomDateOfBirth();
    const languageCode = DataGenerator.getRandomLanguageCode();
    const phoneNumber = DataGenerator.getRandomPhoneNumber();

    await formPage.fillFirstName(firstName);
    await formPage.fillLastName(lastName);
    await formPage.fillEmail(email);
    await formPage.fillPassword(password);
    await formPage.fillConfirmPassword(password);
    await formPage.selectDateOfBirth(dateOfBirth);
    await formPage.selectLanguage(languageCode);
    await formPage.fillPhoneNumber(phoneNumber);
    await formPage.checkRodoCheckbox(); 
    await formPage.checkAllowInfoCheckbox();
    await formPage.submitForm();


    const successHeader = await formPage.getSuccessHeader();
    const expectedHeader = successMessages.registrationSuccessHeader(firstName);
    expect(successHeader).toContain(expectedHeader);

    const successMessage = await formPage.getSuccessMessage();
    const expectedMessage = successMessages.registrationSuccessMessage(email);
    expect(successMessage?.replace(/\s+/g, ' ').trim()).toContain(expectedMessage);
  });

  test('Should display validation errors when required fields are empty', async () => {
    await formPage.submitForm();

    await expect(await formPage.getFirstNameError()).toContain(validationMessages.requiredFirstName);
    await expect(await formPage.getLastNameError()).toContain(validationMessages.requiredLastName);
    await expect(await formPage.getEmailError()).toContain(validationMessages.requiredEmail);
    await expect(await formPage.getPasswordError()).toContain(validationMessages.requiredPassword);
    await expect(await formPage.getConfirmPasswordError()).toContain(
      validationMessages.requiredConfirmPassword
    );
    await expect(await formPage.getDateOfBirthError()).toContain(
      validationMessages.requiredDateOfBirth
    );
    await expect(await formPage.getRodoError()).toContain(validationMessages.requiredRodo);
  });

  test('Should display an error when email format is invalid', async () => {
    const invalidEmail = DataGenerator.getInvalidEmail();
    await formPage.fillEmail(invalidEmail);
    await formPage.submitForm();

    await expect(await formPage.getEmailError()).toContain(validationMessages.invalidEmailFormat);
  });

  test('Should display an error when password and confirm password do not match', async () => {
    const password = DataGenerator.getRandomPassword();
    const mismatchedPassword = DataGenerator.getMismatchedPassword(password);

    await formPage.fillPassword(password);
    await formPage.fillConfirmPassword(mismatchedPassword);
    await formPage.submitForm();

    await expect(await formPage.getConfirmPasswordError()).toContain(
      validationMessages.passwordsDoNotMatch
    );
  });

  test('Should display an error when password does not meet criteria', async () => {
    const invalidPassword = DataGenerator.getInvalidPassword();

    await formPage.fillPassword(invalidPassword);
    await formPage.fillConfirmPassword(invalidPassword);
    await formPage.submitForm();

    const missingCriteria = [
      validationMessages.passwordCriteriaRequirements.minLength,
      validationMessages.passwordCriteriaRequirements.uppercase,
      validationMessages.passwordCriteriaRequirements.number,
      validationMessages.passwordCriteriaRequirements.specialChar,
    ];

    const expectedMessage = `${validationMessages.passwordCriteriaPrefix} ${missingCriteria.join(
      ', '
    )}${validationMessages.passwordCriteriaSuffix}`;
    await expect(await formPage.getPasswordError()).toContain(expectedMessage);
  });

  test('Should validate that password is at least 8 characters', async () => {
    const password = DataGenerator.getWeakPassword('length');

    await formPage.fillPassword(password);
    await formPage.fillConfirmPassword(password);
    await formPage.submitForm();

    const missingCriteria = [validationMessages.passwordCriteriaRequirements.minLength];
    const expectedMessage = `${validationMessages.passwordCriteriaPrefix} ${missingCriteria.join(
      ', '
    )}${validationMessages.passwordCriteriaSuffix}`;
    await expect(await formPage.getPasswordError()).toContain(expectedMessage);
  });

  test('Should validate that password contains at least one uppercase letter', async () => {
    const password = DataGenerator.getWeakPassword('uppercase');

    await formPage.fillPassword(password);
    await formPage.fillConfirmPassword(password);
    await formPage.submitForm();

    const missingCriteria = [validationMessages.passwordCriteriaRequirements.uppercase];
    const expectedMessage = `${validationMessages.passwordCriteriaPrefix} ${missingCriteria.join(
      ', '
    )}${validationMessages.passwordCriteriaSuffix}`;
    await expect(await formPage.getPasswordError()).toContain(expectedMessage);
  });

  test('Should validate that password contains at least one number', async () => {
    const password = DataGenerator.getWeakPassword('number');

    await formPage.fillPassword(password);
    await formPage.fillConfirmPassword(password);
    await formPage.submitForm();

    const missingCriteria = [validationMessages.passwordCriteriaRequirements.number];
    const expectedMessage = `${validationMessages.passwordCriteriaPrefix} ${missingCriteria.join(
      ', '
    )}${validationMessages.passwordCriteriaSuffix}`;
    await expect(await formPage.getPasswordError()).toContain(expectedMessage);
  });

  test('Should validate that password contains at least one special character', async () => {
    const password = DataGenerator.getWeakPassword('special');

    await formPage.fillPassword(password);
    await formPage.fillConfirmPassword(password);
    await formPage.submitForm();

    const missingCriteria = [validationMessages.passwordCriteriaRequirements.specialChar];
    const expectedMessage = `${validationMessages.passwordCriteriaPrefix} ${missingCriteria.join(
      ', '
    )}${validationMessages.passwordCriteriaSuffix}`;
    await expect(await formPage.getPasswordError()).toContain(expectedMessage);
  });

  test('Should display an error when first name contains invalid characters', async () => {
    const invalidFirstName = DataGenerator.getInvalidFirstName();
    await formPage.fillFirstName(invalidFirstName);
    await formPage.submitForm();

    await expect(await formPage.getFirstNameError()).toContain(
      validationMessages.invalidNameCharacters
    );
  });

  test('Should display an error when last name contains invalid characters', async () => {
    const invalidLastName = DataGenerator.getInvalidLastName();
    await formPage.fillLastName(invalidLastName);
    await formPage.submitForm();

    await expect(await formPage.getLastNameError()).toContain(
      validationMessages.invalidNameCharacters
    );
  });

  test('Should display an error when phone number is invalid', async () => {
    const invalidPhoneNumber = DataGenerator.getInvalidPhoneNumber();

    await formPage.fillPhoneNumber(invalidPhoneNumber);
    await formPage.submitForm();

        await expect(await formPage.getPhoneError()).toContain(
        validationMessages.invalidPhoneNumberFormat
    );
  });

  test('Should display errors when phone number is too short', async () => {
    const shortPhoneNumber = DataGenerator.getShortPhoneNumber();

    await formPage.fillPhoneNumber(shortPhoneNumber);
    await formPage.submitForm();

    await expect(await formPage.getPhoneError()).toContain(validationMessages.phoneNumberTooShort);
  });

  test('Should display an error when RODO checkbox is not checked', async () => {
    const firstName = DataGenerator.getRandomFirstName();
    const lastName = DataGenerator.getRandomLastName();
    const email = DataGenerator.getRandomEmail();
    const password = DataGenerator.getRandomPassword();
    const dateOfBirth = DataGenerator.getRandomDateOfBirth();
    const languageCode = DataGenerator.getRandomLanguageCode();
    const phoneNumber = DataGenerator.getRandomPhoneNumber();

    await formPage.fillFirstName(firstName);
    await formPage.fillLastName(lastName);
    await formPage.fillEmail(email);
    await formPage.fillPassword(password);
    await formPage.fillConfirmPassword(password);
    await formPage.selectDateOfBirth(dateOfBirth);
    await formPage.selectLanguage(languageCode);
    await formPage.fillPhoneNumber(phoneNumber);
    await formPage.submitForm();

    await expect(await formPage.getRodoError()).toContain(validationMessages.requiredRodo);
  });

  test('Should allow submission when optional fields are empty', async () => {
    const firstName = DataGenerator.getRandomFirstName();
    const lastName = DataGenerator.getRandomLastName();
    const email = DataGenerator.getRandomEmail();
    const password = DataGenerator.getRandomPassword();
    const dateOfBirth = DataGenerator.getRandomDateOfBirth();

    await formPage.fillFirstName(firstName);
    await formPage.fillLastName(lastName);
    await formPage.fillEmail(email);
    await formPage.fillPassword(password);
    await formPage.fillConfirmPassword(password);
    await formPage.selectDateOfBirth(dateOfBirth);
    await formPage.checkRodoCheckbox();
    await formPage.submitForm();

    const successHeader = await formPage.getSuccessHeader();
    const expectedHeader = successMessages.registrationSuccessHeader(firstName);
    expect(successHeader?.trim()).toContain(expectedHeader.trim());

    const successMessage = await formPage.getSuccessMessage();
    const expectedMessage = successMessages.registrationSuccessMessage(email);
    expect(successMessage?.replace(/\s+/g, ' ').trim()).toContain(expectedMessage);
  });

  test('Should not submit the form if there are validation errors', async () => {
    const firstName = DataGenerator.getRandomFirstName();
    const lastName = DataGenerator.getRandomLastName();
    const invalidEmail = DataGenerator.getInvalidEmail();
    const invalidPassword = DataGenerator.getInvalidPassword();
    const mismatchedPassword = DataGenerator.getMismatchedPassword(invalidPassword);

    await formPage.fillFirstName(firstName);
    await formPage.fillLastName(lastName);
    await formPage.fillEmail(invalidEmail);
    await formPage.fillPassword(invalidPassword);
    await formPage.fillConfirmPassword(mismatchedPassword);
    await formPage.checkRodoCheckbox();
    await formPage.submitForm();

    await expect(await formPage.getSuccessHeader()).toBeNull();
    await expect(await formPage.getSuccessMessage()).toBeNull();

    await expect(await formPage.getEmailError()).toContain(validationMessages.invalidEmailFormat);

    const missingCriteria = [
      validationMessages.passwordCriteriaRequirements.minLength,
      validationMessages.passwordCriteriaRequirements.uppercase,
      validationMessages.passwordCriteriaRequirements.number,
      validationMessages.passwordCriteriaRequirements.specialChar,
    ];
    const expectedPasswordError = `${validationMessages.passwordCriteriaPrefix} ${missingCriteria.join(
      ', '
    )}${validationMessages.passwordCriteriaSuffix}`;
    await expect(await formPage.getPasswordError()).toContain(expectedPasswordError);

    await expect(await formPage.getConfirmPasswordError()).toContain(
      validationMessages.passwordsDoNotMatch
    );
  });

  test('Should display errors when date of birth is not selected', async () => {
    const firstName = DataGenerator.getRandomFirstName();
    const lastName = DataGenerator.getRandomLastName();
    const email = DataGenerator.getRandomEmail();
    const password = DataGenerator.getRandomPassword();

    await formPage.fillFirstName(firstName);
    await formPage.fillLastName(lastName);
    await formPage.fillEmail(email);
    await formPage.fillPassword(password);
    await formPage.fillConfirmPassword(password);
    await formPage.checkRodoCheckbox();
    await formPage.submitForm();

    await expect(await formPage.getDateOfBirthError()).toContain(
      validationMessages.requiredDateOfBirth
    );
  });
});
