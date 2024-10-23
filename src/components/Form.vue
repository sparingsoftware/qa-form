<template>
  <div>
    <ValidationObserver ref="form" tag="div">
      <form @submit.prevent="onSubmit">
        <!-- Imię field -->
        <ValidationProvider name="Imię" rules="required|alpha_spaces_dashes" v-slot="{ errors }" class="input-wrapper">
          <label class="label">
            Imię*<br />
            <input class="input" v-model="firstName" type="text" placeholder="Imię" autocomplete="name" data-test-id="first-name-input" />
            <span class="errors" data-test-id="first-name-error">{{ errors[0] }}</span>
          </label>
        </ValidationProvider>

        <!-- Nazwisko field -->
        <ValidationProvider name="Nazwisko" rules="required|alpha_spaces_dashes" v-slot="{ errors }" class="input-wrapper">
          <label class="label">
            Nazwisko*<br />
            <input class="input" v-model="lastName" type="text" placeholder="Nazwisko" autocomplete="family-name" data-test-id="last-name-input" />
            <span class="errors" data-test-id="last-name-error">{{ errors[0] }}</span>
          </label>
        </ValidationProvider>

        <!-- E-mail field -->
        <ValidationProvider name="E-mail" rules="required|email-abstract" v-slot="{ errors }" class="input-wrapper">
          <label class="label">
            Adres e-mail*<br />
            <input class="input" v-model="email" type="email" placeholder="Twój adres e-mail" autocomplete="email" data-test-id="email-input" />
            <span class="errors" data-test-id="email-error">{{ errors[0] }}</span>
          </label>
        </ValidationProvider>

        <!-- Password field -->
        <ValidationProvider name="password" rules="password|required" v-slot="{ errors }" class="input-wrapper">
          <label class="label">
            Hasło*<br />
            <input class="input" v-model="password" type="password" placeholder="Hasło" autocomplete="new-password" data-test-id="password-input" />
            <span class="errors" data-test-id="password-error">{{ errors[0] }}</span>
          </label>
        </ValidationProvider>

        <!-- Repeat Password field -->
        <ValidationProvider name="Powtórz hasło" rules="required|password-confirmed:password" v-slot="{ errors }" class="input-wrapper">
          <label class="label">
            Powtórz hasło*<br />
            <input class="input" v-model="repassword" type="password" placeholder="Powtórz hasło" autocomplete="new-password" data-test-id="confirm-password-input" />
            <span class="errors" data-test-id="confirm-password-error">{{ errors[0] }}</span>
          </label>
        </ValidationProvider>

        <!-- Date of Birth field -->
        <ValidationProvider name="Data urodzenia" rules="required" v-slot="{ errors }" class="input-wrapper">
          <label class="label">
            Data urodzenia*<br />
            <date-picker class="datepicker" v-model="dateOfBirth" type="date" placeholder="Data urodzenia" data-test-id="date-of-birth-input"></date-picker>
            <span class="errors" data-test-id="date-of-birth-error">{{ errors[0] }}</span>
          </label>
        </ValidationProvider>

        <!-- Language Selection -->
        <div class="input-wrapper">
          <label class="label">
            Język<br />
            <select v-model="language" class="input select" data-test-id="language-select">
              <option value="" selected>Wybierz język</option>
              <option :value="code" :key="code" v-for="(name, code) in languageNames">{{ name }}</option>
            </select>
          </label>
        </div>

        <!-- Phone Number field -->
        <ValidationProvider name="Numer telefonu" rules="phone" v-slot="{ errors }" class="input-wrapper">
          <label class="label">
            Numer telefonu<br />
            <vue-tel-input class="phone-input" v-model="phoneNumber" default-country="pl" :input-options="{ placeholder: 'Numer telefonu', disabledFormatting: true }" data-test-id="phone-input"></vue-tel-input>
            <span class="errors" v-if="isPhoneInputInitialized" data-test-id="phone-error">{{ errors[0] }}</span>
          </label>
        </ValidationProvider>

        <!-- Rodo Checkbox -->
<ValidationProvider
  rules="checkbox-required"
  v-slot="{ errors }"
  class="input-wrapper"
  name="rodo"
>
  <label class="label" data-test-id="rodo-checkbox-label">
    <div class="fake-input-wrap">
      <input
        class="input"
        v-model="rodo"
        type="checkbox"
      />
      <div class="fake-input" data-test-id="rodo-checkbox"></div>
      <span class="checkbox-text">
        Akceptuję <a href="/regulamin" @click.prevent="onLinkClick('regulaminu')" data-test-id="rodo-regulamin-link">regulamin</a> oraz&nbsp;
        <a href="/polityka-prywatnosci" @click.prevent="onLinkClick('polityki prywatności')" data-test-id="rodo-polityka-link">politykę prywatności</a> *
      </span>
    </div>
    <span class="errors" data-test-id="rodo-error">{{ errors[0] }}</span>
  </label>
</ValidationProvider>

<!-- Allow Info Checkbox -->
<ValidationProvider
  v-slot="{ errors }"
  class="input-wrapper"
  name="allowSend"
>
  <label class="label" data-test-id="allow-info-checkbox-label">
    <div class="fake-input-wrap">
      <input
        class="input"
        v-model="allowInfo"
        type="checkbox"
      />
      <div class="fake-input" data-test-id="allow-info-checkbox"></div>
      <span class="checkbox-text">
        Wyrażam zgodę na&nbsp;otrzymywanie informacji na&nbsp;podany
        przeze mnie&nbsp;adres e‑mail.
      </span>
    </div>
    <span class="errors" data-test-id="allow-info-error">{{ errors[0] }}</span>
  </label>
</ValidationProvider>

        <!-- Submit Button -->
        <div class="btn-wrapper">
          <button type="submit" class="btn" data-test-id="submit-button">Zarejestruj</button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>


<script>
import DatePicker from 'vue2-datepicker';
import languages from '@cospired/i18n-iso-languages';
import languagesPl from '@cospired/i18n-iso-languages/langs/pl.json';
import { VueTelInput } from 'vue-tel-input';

languages.registerLocale(languagesPl);
const languageNames = languages.getNames('pl');

export default {
  components: {
    VueTelInput,
    DatePicker,
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repassword: '',
      rodo: false,
      allowInfo: false,
      language: '',
      dateOfBirth: null,
      phoneNumber: null,
      isPhoneInputInitialized: false,
    };
  },
  methods: {
    onLinkClick(czego) {
      alert(
        `Jeśli widzisz tę wiadomość, wpisz w listę błędów:\nNiedziałający link do ${czego}`
      );
    },
    async onSubmit() {
      await this.$refs.form.validate();
      const errors = { ...this.$refs.form.errors };

      const isValid = Object.values(errors).every(
        (errors) => errors.length === 0
      );

      if (isValid) {
        this.$emit('submit', {
          firstName: this.firstName,
          email: this.email,
        });
      }
    },
  },
  computed: {
    languageNames() {
      return languageNames;
    },
  },
  mounted() {
    // https://github.com/iamstevendao/vue-tel-input/issues/322
    // https://github.com/iamstevendao/vue-tel-input/issues/447
    setTimeout(() => {
      this.$refs.form.setErrors({ ['Numer telefonu']: '' });
      this.isPhoneInputInitialized = true;
    }, 1000);
  },
  watch: {
    isPhoneInputInitialized: {
      handler(value) {
        console.log(value);
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.input-wrapper {
  display: block;
  margin-bottom: 20px;
}

.input {
  display: block;
  width: 100%;
  color: #065a57;
  font-weight: 600;
  padding: 15px 20px;
  margin-top: 4px;
  border-radius: 3px;
  border: none;
}

input[type='checkbox'] {
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
}

input[type='checkbox']:focus + .fake-input {
  border: 2px solid white;
}

input[type='checkbox']:checked + .fake-input::after {
  content: '';
  display: block;
  width: 7px;
  height: 12px;
  border-bottom: 3px solid white;
  border-right: 3px solid white;

  position: absolute;
  left: 50%;
  top: 42%;

  transform: translate(-50%, -50%) rotate(30deg);
}

.fake-input-wrap {
  display: flex;
  position: relative;
}

.fake-input {
  position: relative;
  width: 20px;
  height: 20px;
  border: 1px solid white;
  margin-right: 20px;
}

.checkbox-text {
  width: calc(100% - 40px);
}

.errors {
  font-size: 14px;
  color: #f6e96e;
}

.btn-wrapper {
  margin-top: 50px;
  display: flex;
  justify-content: flex-end;
}

.datepicker {
  width: 100%;
}
</style>

<style>
.mx-input {
  padding: 15px 20px !important;
  margin-top: 4px;
  font-weight: bold;
  color: #065a57 !important;
  height: 46px !important;
}

.phone-input {
  height: 46px;
  border-color: white;
  border-radius: 3px;
  border-width: 2px;
  margin-top: 4px;
}

.phone-input:focus-within {
  box-shadow: none;
  border-color: black;
  outline: 1px solid;
}

.vti__input {
  padding-left: 20px !important;
  font-weight: bold;
}

.vti__dropdown-item {
  color: black;
}

.vti__dropdown-list.below {
  top: 44px;
}

.vti__dropdown {
  background-color: #f3f3f3;
}
</style>
