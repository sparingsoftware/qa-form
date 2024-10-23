export const validationMessages = {

    requiredFirstName: 'Pole Imię jest wymagane',
    requiredLastName: 'Pole Nazwisko jest wymagane',
    requiredEmail: 'Pole E-mail jest wymagane',
    requiredPassword: 'Pole password jest wymagane',
    requiredConfirmPassword: 'Pole Powtórz hasło jest wymagane',
    requiredDateOfBirth: 'Pole Data urodzenia jest wymagane',
    requiredRodo: 'To pole jest wymagane',
  
    invalidEmailFormat: 'Pole E-mail musi być poprawnym adresem email',
  
    passwordCriteriaPrefix: 'Hasło musi zawierać:',
    passwordCriteriaSuffix: '!',
    passwordCriteriaRequirements: {
      minLength: 'co najmniej 8 znaków',
      uppercase: 'dużą literę',
      number: 'liczbę',
      specialChar: 'znak specjalny',
    },
  
    passwordsDoNotMatch: 'Hasła nie są jednakowe!',
  
    invalidNameCharacters: 'To pole może zawierać tylko litery, spacje i "-"',
  
    invalidPhoneNumberFormat: 'To pole może zawierać tylko cyfry i spacje',
    phoneNumberTooShort: 'To pole musi zawierać co najmniej 9 cyfr',
  };
  
  export const successMessages = {
    registrationSuccessHeader: (firstName: string) =>
      `${firstName}, dziękujemy za rejestrację!`,
    registrationSuccessMessage: (email: string) =>
      `Na Twój adres email ${email} wysłaliśmy wiadomość z linkiem aktywującym konto`,
  };
  