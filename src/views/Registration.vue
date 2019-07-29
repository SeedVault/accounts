<template>
  <div class="container-fluid">
    <div class="form-row">
      <div class="col-sm-4"></div>
      <div class="col-sm-4">
        <div class="text-center">
          <img class="logo" src="@/assets/images/accounts-logo.png" />
          <h2>Sign up</h2>
          <p><strong>or <router-link :to="{ name: 'login'}">sign in</router-link></strong></p>
        </div>
        <form @submit.prevent="signup">

          <input-text v-model="firstname" id="firstname" label="First name" placeholder="First name"
            type="text" icon="outline-person-24px@2x.svg" :validationErrors="validationErrors"></input-text>

          <input-text v-model="lastname" id="lastname" label="Last name" placeholder="Last name"
            type="text" icon="outline-person-24px@2x.svg" :validationErrors="validationErrors"></input-text>

          <input-text v-model="username" id="username" label="Username" placeholder="Your username"
            type="text" icon="outline-person-24px@2x.svg" :validationErrors="validationErrors"></input-text>

          <input-text v-model="email" id="email" label="Email address" placeholder="Your email"
            type="text" icon="outline-mail-24px@2x.svg" :validationErrors="validationErrors"></input-text>

          <input-select v-model="country" :options="countries" id="country" label="Country" placeholder="Your country"
            icon="outline-location_on-24px@2x.svg" :validationErrors="validationErrors"></input-select>

          <input-text v-model="pass" id="pass" label="Password" placeholder="Your password"
            type="password" icon="outline-lock-24px@2x.svg" :validationErrors="validationErrors"></input-text>

          <input type="submit" id="accept" value="Sign up" class="btn btn-primary btn-lg btn-block"/>

          <p v-if="error" class="error">Bad login information</p>

        </form>
        <div class="footer">
          By signing up you're accepting our <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
      <div class="col-sm-4"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      pass: '',
      country: null,
      error: false,
      validationErrors: []
    }
  },
  methods: {
    signup () {
      alert('Signed up!')
    }
  },
  computed: {
    countries() {
      return this.$store.state.countries;
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  text-align: center;
  margin-top: 37px;
  margin-bottom: 60px;
}

h2 {
  font-size: 48px;
  color: #323743;
  font-weight: 700;
  margin-bottom: 5px;
}

.footer {
  margin: 30px 0px;
  color: #a0a6ad;
}
</style>
