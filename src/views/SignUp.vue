<template>
  <boxed-page>
    <template v-slot:main>

      <h1 class="display-1 text-dark text-center">
        {{ $t('sign_up.sign_up') }}
      </h1>
      <p class="text-center font-weight-bold mb-4">
        {{ $t('sign_up.or') }}
        <router-link :to="{ name: 'sign-in'}">{{ $t('sign_up.sign_in') }}</router-link>
      </p>

      <div v-show="disclaimer">
        <p class="text-justify">{{ $t('sign_up.disclaimer_text') }}</p>
        <p>
          <i18n path="sign_up.disclaimer_text_2">
            <a slot="registration_url" href="https://developers.seedtoken.io/private-beta">
            https://developers.seedtoken.io/private-beta</a>
          </i18n>
        </p>
        <input type="button" :value="$t('sign_up.i_have_a_referral_code')"
          class="btn btn-primary btn-lg btn-block mt-5 font-weight-bold"
          @click="disclaimer = false" />
      </div>

      <validation-box id="_" :validationErrors="validationErrors"></validation-box>

      <form @submit.prevent="submit" v-show="!disclaimer">

        <input-text v-model="firstname" id="firstname"
        :label="$t('domain.user.first_name')"
        :placeholder="$t('domain.user.your_first_name')" icon="person"
        :validationErrors="validationErrors"></input-text>

        <input-text v-model="lastname" id="lastname"
        :label="$t('domain.user.last_name')"
        :placeholder="$t('domain.user.your_last_name')" icon="person"
        :validationErrors="validationErrors"></input-text>

        <input-text v-model="email" id="email"
        :label="$t('domain.user.email_address')"
        :placeholder="$t('domain.user.your_email_address')" icon="mail"
        :validationErrors="validationErrors"></input-text>

        <input-text v-model="username" id="username"
        :label="$t('domain.user.username')"
        :placeholder="$t('domain.user.your_username')" icon="person"
        :validationErrors="validationErrors"></input-text>

        <input-select v-model="countryCode" :options="countries()" id="countryCode"
        :label="$t('domain.user.country')"
        :placeholder="$t('domain.user.your_country')" icon="location"
        :validationErrors="validationErrors"></input-select>

        <input-select v-model="role" :options="roles()" id="role"
        :label="$t('domain.user.role')"
        :placeholder="$t('domain.user.your_role')" icon="widgets"
        :validationErrors="validationErrors"></input-select>

        <input-text v-model="referralCode" id="referralCode"
        :label="$t('domain.user.referral_code')"
        :placeholder="$t('domain.user.your_referral_code')" icon="key"
        :validationErrors="validationErrors"></input-text>

        <input-password v-model="password" id="password"
        :label="$t('domain.user.password')"
        :placeholder="$t('domain.user.your_password')" icon="lock"
        :validationErrors="validationErrors"></input-password>

        <vue-recaptcha
          ref="recaptcha"
          @verify="signup"
          @expired="onCaptchaExpired"
          size="invisible"
          :sitekey="getRecaptchaSiteKey()"
          :loadRecaptchaScript="true"
        ></vue-recaptcha>

        <input type="submit" id="accept" :value="$t('sign_up.sign_up_button')"
        class="btn btn-primary btn-lg btn-block font-weight-bold"/>

        <p class="text-black-50 mt-4">
          <i18n path="sign_up.legal_disclaimer">
            <router-link slot="terms" :to="{ name: 'legal-terms'}">
              {{ $t('sign_up.terms') }}</router-link>
            <router-link slot="privacy_policy" :to="{ name: 'legal-privacy'}">
              {{ $t('sign_up.privacy_policy') }}</router-link>
          </i18n>
        </p>

      </form>

    </template>
  </boxed-page>
</template>

<script>
import BoxedPage from 'seed-theme/src/layouts/BoxedPage.vue';
import VueRecaptcha from 'vue-recaptcha';
import { reactive, toRefs } from '@vue/composition-api';

export default {
  name: 'SignUp',
  components: {
    BoxedPage,
    VueRecaptcha,
  },
  setup(props, context) {
    const data = reactive({
      disclaimer: true,
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      countryCode: 'us',
      role: 'user',
      referralCode: '',
      password: '',
      validationErrors: [],
    });

    function getRecaptchaSiteKey() {
      return process.env.VUE_APP_RECAPTCHA_SITE_KEY;
    }

    function roles() {
      const roleList = [];
      const { allRoles } = context.root.$store.getters;
      for (let i = 0; i < allRoles.length; i += 1) {
        roleList.push({
          value: allRoles[i],
          text: context.root.$i18n.t(`domain.roles.${allRoles[i]}`),
        });
      }
      return roleList;
    }

    function countries() {
      const countryList = [];
      const { allCountries } = context.root.$store.getters;
      for (let i = 0; i < allCountries.length; i += 1) {
        countryList.push({
          value: allCountries[i],
          text: context.root.$i18n.t(`domain.countries.${allCountries[i]}`),
        });
      }
      return countryList;
    }

    function submit() {
      context.refs.recaptcha.execute();
    }

    function onCaptchaExpired() {
      context.refs.recaptcha.reset();
    }

    async function signup() {
      try {
        data.validationErrors = [];
        context.refs.recaptcha.reset();
        await context.root.axios.post('/auth/sign-up', {
          username: data.username,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          countryCode: data.countryCode,
          role: data.role,
          referralCode: data.referralCode,
          password: data.password,
        });
        context.root.$router.push({
          name: 'verify-account',
          query: {
            email: data.email,
          },
        });
      } catch (error) {
        if (error.response && error.response.status === 422) {
          data.validationErrors = context.root.normalizeErrors(error.response);
        } else {
          context.root.showFatalError(error);
        }
      }
    }

    return {
      ...toRefs(data), roles, countries, signup, submit, onCaptchaExpired, getRecaptchaSiteKey,
    };
  },
};
</script>
