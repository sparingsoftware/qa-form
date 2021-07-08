<template>
  <div>
    <ValidationObserver ref="form" tag="div">
      <form @submit.prevent="onSubmit">
        <ValidationProvider
          name="Imię"
          rules="required"
          v-slot="{ errors }"
          class="input-wrapper"
        >
          <label class="label">
            Imię<br />
            <input
              class="input"
              v-model="firstName"
              type="text"
              placeholder="Imię"
              autocomplete="name"
            />
            <span class="errors">{{ errors[0] }}</span>
          </label>
        </ValidationProvider>

        <ValidationProvider
          name="Nazwisko"
          rules="required|alpha_spaces"
          v-slot="{ errors }"
          class="input-wrapper"
        >
          <label class="label">
            Nazwisko<br />
            <input
              class="input"
              v-model="lastName"
              type="text"
              placeholder="Nazwisko"
              autocomplete="family-name"
            />
            <span class="errors">{{ errors[0] }}</span>
          </label>
        </ValidationProvider>

        <ValidationProvider
          name="E-mail"
          rules="required|email-abstract"
          v-slot="{ errors }"
          class="input-wrapper"
        >
          <label class="label">
            Adres e-mail*<br />
            <input
              class="input"
              v-model="email"
              type="email"
              placeholder="Twój adres e-mail"
              autocomplete="email"
            />
            <span class="errors">{{ errors[0] }}</span>
          </label>
        </ValidationProvider>

        <ValidationProvider
          name="password"
          rules="password|required"
          v-slot="{ errors }"
          class="input-wrapper"
        >
          <label class="label">
            Hasło*<br />
            <input
              class="input"
              v-model="password"
              type="password"
              placeholder="Hasło"
              autocomplete="new-password"
            />
            <span class="errors">{{ errors[0] }}</span>
          </label>
        </ValidationProvider>

        <ValidationProvider
          name="Powtórz hasło"
          rules="required|password-confirmed:password"
          v-slot="{ errors }"
          class="input-wrapper"
        >
          <label class="label">
            Powtórz hasło*<br />
            <input
              class="input"
              v-model="repassword"
              type="password"
              placeholder="Powtórz hasło"
              autocomplete="new-password"
            />
            <span class="errors">{{ errors[0] }}</span>
          </label>
        </ValidationProvider>

        <br />

        <ValidationProvider
          rules="checkbox-required"
          v-slot="{ errors }"
          class="input-wrapper"
          name="rodo"
        >
          <label class="label">
            <div class="fake-input-wrap">
              <input
                class="input"
                v-model="rodo"
                type="checkbox"
                tabindex="-1"
              />
              <div
                class="fake-input"
                :class="{ 'fake-input--ff': isFirefox }"
              ></div>
              <span class="checkbox-text">
                Akceptuję
                <a href="/regulamin" @click.prevent="onLinkClick('regulaminu')"
                  >regulamin</a
                >
                oraz
                <a
                  href="/polityka-prywatnosci"
                  @click.prevent="onLinkClick('polityki prywatności')"
                  >politykę prywatności</a
                >
                *<br />
              </span>
            </div>
            <span class="errors">{{ errors[0] }}</span>
          </label>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          class="input-wrapper"
          name="allowSend"
        >
          <label class="label">
            <div class="fake-input-wrap">
              <input
                class="input"
                v-model="allowInfo"
                type="checkbox"
                tabindex="-1"
              />
              <div
                class="fake-input"
                :class="{ 'fake-input--ff': isFirefox }"
              ></div>
              <span class="checkbox-text">
                Wyrażam zgodę na otrzymywanie informacji na podany przeze mnie
                adres e‑mail.
              </span>
            </div>
            <span class="errors">{{ errors[0] }}</span>
          </label>
        </ValidationProvider>

        * Pola wymagane

        <div class="btn-wrapper">
          <button type="submit" class="btn">Załóż konto</button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numberOfClickInSubmit: 0,
      isFirefox: navigator.userAgent.toLowerCase().includes('firefox'),
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repassword: '',
      rodo: false,
      allowInfo: false,
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
      delete errors.rodo;

      const isValid = Object.values(errors).every(
        (errors) => errors.length === 0
      );

      if (isValid) {
        this.numberOfClickInSubmit += 1;
        if (this.numberOfClickInSubmit < 2) return;

        this.$emit('submit', {
          firstName: this.firstName,
          email: this.email,
        });
      }
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

.fake-input--ff::after {
  height: 15px !important;
  left: 100% !important;
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
</style>
