<template>
  <div class="app-wrap" :class="{ 'app-wrap--center-content': user }">
    <div class="container" v-if="!user">
      <h1>Załóż konto</h1>
      <p>
        Dzięki aplikacji możesz również ubiegać się o świadczenia dla swoich
        bliskich, dla których jesteś opiekunem prawnym.
      </p>
      <p>
        Uzupełnij pola poniżej swoimi danymi, a w kolejnych krokach zdecyduj czy
        konto będzie należeć do Ciebie czy do osoby bliskiej, dla której jesteś
        opiekunem prawnym
      </p>
      <Form class="form" @submit="(submittedUser) => (user = submittedUser)" />
    </div>

    <div class="container" v-if="user">
      <h1>{{ user.firstName }} , dziękujemy za rejestrację!</h1>
      <p>
        Na Twój adres email
        <span class="email">{{ user.email }}</span> wysłaliśmy wiadomość z
        linkiem aktywującym konto
        <br />
      </p>
    </div>
  </div>
</template>

<script>
import Form from '@/components/Form.vue';

export default {
  components: {
    Form,
  },
  data() {
    return {
      user: null,
    };
  },
};
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: 'Open Sans', sans-serif;
  color: white;
  margin: 40px;
}

@media (max-width: 1024px) {
  body {
    margin: 0;
    background: #065a57;
    width: calc(100% + 20px);
  }
}

h1 {
  font-size: 46px;
}

a {
  color: white;
  text-decoration: underline;
}

a:hover,
a:focus {
  text-decoration: none;
}

h1,
h2,
h3,
h4 {
  font-family: 'Oswald', sans-serif;
  text-align: center;
}

.app-wrap {
  background: #065a57;
  padding: 60px 0 100px;
  min-height: calc(100vh - 80px);
}

@media (max-width: 1024px) {
  .app-wrap {
    padding: 20px;
  }
}

.app-wrap--center-content {
  display: flex;
  align-items: center;
}

.container {
  max-width: 700px;
  margin: 0 auto;
}

.form {
  margin-top: 60px;
}

.app-wrap p {
  text-align: center;
  padding: 0 30px;
}

.btn {
  text-align: center;
  padding: 15px 30px;
  border-radius: 25px;
  border: 2px solid white;
  text-transform: uppercase;
  color: #065a57;
  font-weight: 700;
  font-family: 'Oswald', sans-serif;
  cursor: pointer;
  transition: all 0.15s;
  outline: none;
}

.btn:hover,
.btn:focus {
  color: white;
  background: #065a57;
  border-color: white;
}

.email {
  color: #46ccc8;
}
</style>
