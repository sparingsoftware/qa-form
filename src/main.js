import Vue from 'vue';
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from 'vee-validate';
import pl from 'vee-validate/dist/locale/pl.json';
import * as rules from 'vee-validate/dist/rules';
import App from './App.vue';

// install rules and localization
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

extend('email-abstract', {
  ...rules.email,
  message: 'To pole musi być poprawnym adresem email',
});

extend('password-confirmed', {
  ...rules.confirmed,
  message: 'Hasła nie są jednakowe!',
});

extend('checkbox-required', {
  validate(required) {
    return required;
  },
  message: 'To pole jest wymagane',
});

extend('password', (value) => {
  const hasBigLetter = value !== value.toLowerCase();
  const hasDigit = /\d/.test(value);
  const hasEnoughChars = value.length >= 8;
  const hasSpecialChar = /\W/.test(value);

  const isValid = hasBigLetter && hasDigit && hasEnoughChars && hasSpecialChar;
  if (isValid) return true;

  const requirements = [];
  if (!hasEnoughChars) {
    requirements.push('co najmniej 8 znaków');
  }
  if (!hasBigLetter) {
    requirements.push('dużą literę');
  }
  if (!hasDigit) {
    requirements.push('liczbę');
  }
  if (!hasSpecialChar) {
    requirements.push('znak specjalny');
  }

  return `Hasło musi zawierać: ${requirements.join(', ')}!`;
});

localize('pl', pl);

// Install components globally
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
