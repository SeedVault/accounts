<template>
  <div class="text-left">
    <div class="text-center">
      <h2>{{ $t('sign_up.sign_up') }}</h2>
      <p><strong>{{ $t('sign_up.or') }}
      <router-link :to="{ name: 'sign-in'}">{{ $t('sign_up.sign_in') }}</router-link></strong></p>
    </div>
    <form @submit.prevent="signup">

      <input-text v-model="firstname" id="firstname" :label="$t('domain.user.first_name')"
      placeholder="First name" icon="outline-person-24px@2x.svg"
      :validationErrors="validationErrors"></input-text>

      <input-text v-model="lastname" id="lastname" :label="$t('domain.user.last_name')"
        :placeholder="$t('domain.user.your_last_name')" icon="outline-person-24px@2x.svg"
        :validationErrors="validationErrors"></input-text>

      <input-text v-model="username" id="username" :label="$t('domain.user.username')"
      :placeholder="$t('domain.user.your_username')" icon="outline-person-24px@2x.svg"
      :validationErrors="validationErrors"></input-text>

      <input-text v-model="email" id="email" :label="$t('domain.user.email_address')"
      :placeholder="$t('domain.user.your_email_address')"
      icon="outline-mail-24px@2x.svg" :validationErrors="validationErrors"></input-text>

      <input-select v-model="countryCode" :options="countries" id="countryCode"
      :label="$t('domain.user.country')" :placeholder="$t('domain.user.your_country')"
      icon="outline-location_on-24px@2x.svg"
      :validationErrors="validationErrors"></input-select>

      <input-select v-model="role" :options="roles" id="role"
      :label="$t('domain.user.role')" :placeholder="$t('domain.user.your_role')"
      icon="outline-location_on-24px@2x.svg"
      :validationErrors="validationErrors"></input-select>

      <input-password v-model="password" id="password" :label="$t('domain.user.password')"
      :placeholder="$t('domain.user.your_password')" icon="outline-lock-24px@2x.svg"
      :validationErrors="validationErrors"></input-password>

      <input type="submit" id="accept" :value="$t('sign_up.sign_up_button')"
      class="btn btn-primary btn-lg btn-block"/>

    </form>
    <div class="legal-footer">
      <i18n path="sign_up.legal_disclamer">
        <a place="terms" href="#">{{ $t('sign_up.terms') }}</a>
        <a place="privacy_policy" href="#">{{ $t('sign_up.privacy_policy') }}</a>
      </i18n>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      countryCode: 'US',
      role: 'user',
      password: '',
      validationErrors: [],
    };
  },
  methods: {
    signup() {
      const that = this;
      this.validationErrors = [];
      this.axios.post(`/${this.$i18n.locale}/auth/sign-up`, {
        username: this.username,
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        countryCode: this.countryCode,
        role: this.role,
        password: this.password,
      })
        .then(() => {
          this.$router.push({ name: 'verify-account', query: { email: this.email } });
        })
        .catch((error) => {
          if (error.response.status === 422) {
            that.validationErrors = this.normalizeErrors(error.response);
          } else {
            alert(error.response.status);
          }
        });
    },
  },
  computed: {
    ...mapGetters(['allCountries', 'allRoles']),
    roles: function () {
      let roleList = [];
      for (let i = 0; i < this.allRoles.length; i++) {
        roleList.push({
          value: this.allRoles[i],
          text: this.$i18n.t(`domain.roles.${this.allRoles[i]}`),
         });
      }
      return roleList;
    },
    countries: function () {
      let countryList = [];
      for (let i = 0; i < this.allCountries.length; i++) {
        countryList.push({
          value: this.allCountries[i],
          text: this.$i18n.t(`domain.countries.${this.allCountries[i]}`),
         });
      }
      return countryList;
    },
  },
};
</script>

<style lang="scss" scoped>

h2 {
  font-size: 48px;
  color: #323743;
  font-weight: 700;
  margin-bottom: 5px;
}

.legal-footer {
  margin: 30px 0px;
  color: #a0a6ad;
}
</style>
