import { Page } from '@playwright/test';

export class FormPage {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string = 'http://localhost:8080') {
    await this.page.goto(url);
  }

  async fillFirstName(firstName: string) {
    await this.page.fill('[data-test-id="first-name-input"]', firstName);
  }

  async fillLastName(lastName: string) {
    await this.page.fill('[data-test-id="last-name-input"]', lastName);
  }

  async fillEmail(email: string) {
    await this.page.fill('[data-test-id="email-input"]', email);
  }

  async fillPassword(password: string) {
    await this.page.fill('[data-test-id="password-input"]', password);
  }

  async fillConfirmPassword(confirmPassword: string) {
    await this.page.fill('[data-test-id="confirm-password-input"]', confirmPassword);
  }

  async selectDateOfBirth(date: string) {
    await this.page.fill('[data-test-id="date-of-birth-input"]', date);

  }
  async selectLanguage(languageCode: string) {
    await this.page.selectOption('[data-test-id="language-select"]', languageCode);
  }

  async fillPhoneNumber(phoneNumber: string) {
    await this.page.fill('[data-test-id="phone-input"] input', phoneNumber);
  }

  async checkRodoCheckbox() {
    await this.page.click('[data-test-id="rodo-checkbox" ]');
  }
  async checkAllowInfoCheckbox() {
    await this.page.click('[data-test-id="allow-info-checkbox"]');
  }

  async submitForm() {
    await this.page.click('[data-test-id="submit-button"]');
  }

  async getFirstNameError(): Promise<string | null> {
    return await this.page.textContent('[data-test-id="first-name-error"]');
  }

  async getLastNameError(): Promise<string | null> {
    return await this.page.textContent('[data-test-id="last-name-error"]');
  }

  async getEmailError(): Promise<string | null> {
    return await this.page.textContent('[data-test-id="email-error"]');
  }

  async getPasswordError(): Promise<string | null> {
    return await this.page.textContent('[data-test-id="password-error"]');
  }

  async getConfirmPasswordError(): Promise<string | null> {
    return await this.page.textContent('[data-test-id="confirm-password-error"]');
  }

  async getDateOfBirthError(): Promise<string | null> {
    return await this.page.textContent('[data-test-id="date-of-birth-error"]');
  }

  async getPhoneError(): Promise<string | null> {
    return await this.page.textContent('[data-test-id="phone-error"]');
  }

  async getRodoError(): Promise<string | null> {
    return await this.page.textContent('[data-test-id="rodo-error"]');
  }

  async getAllowInfoError(): Promise<string | null> {
    return await this.page.textContent('[data-test-id="allow-info-error"]');
  }

  async getSuccessHeader(): Promise<string | null> {
    return await this.page.textContent('[data-test-id="success-header"]');
  }

  async getSuccessMessage(): Promise<string | null> {
    return await this.page.textContent('[data-test-id="success-message"]');
  }
}
