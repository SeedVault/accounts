<template>
  <boxed-page>
    <template v-slot:main>

      <centered-error-box
        icon="error-red"
        :message="$t('domain.user.validation.unauthorized_application')"
        v-if="!appFound"
      />

      <div v-if="appFound">
        <h1 class="display-1 text-dark text-center">
          {{ $t('sign_in.sign_in') }}
        </h1>
        <p class="text-center font-weight-bold mb-4">
          {{ $t('sign_in.or') }}
          <router-link :to="{ name: 'sign-up'}">{{ $t('sign_in.sign_up') }}</router-link>
        </p>

        <validation-box id="_" :validationErrors="validationErrors"></validation-box>

        <form @submit.prevent="login">

          <input-text v-model="usernameOrEmail" id="usernameOrEmail"
          :label="$t('sign_in.username_or_email_address')"
          :placeholder="$t('domain.user.your_email_address')" icon="mail"
          :validationErrors="validationErrors"></input-text>

          <input-password v-model="password" id="password"
          :label="$t('domain.user.password')"
          :placeholder="$t('domain.user.your_password')" icon="lock"
          :validationErrors="validationErrors"></input-password>

          <div class="mb-4 text-right">
            <!-- <input-checkbox v-model="remember" id="remember"
              :label="$t('sign_in.keep_me_logged_in')"></input-checkbox>
            </div> -->
            <router-link :to="{ name: 'forgot-password'}">
              {{ $t('sign_in.forgot_password') }}
            </router-link>
          </div>

          <input type="submit" id="accept" :value="$t('sign_in.sign_in_button')"
          class="btn btn-primary btn-lg btn-block font-weight-bold"/>

        </form>
      </div>
    </template>
    <router-view/>
  </boxed-page>
</template>

<script>
import BoxedPage from 'seed-theme/src/layouts/BoxedPage.vue';
import { reactive, toRefs } from '@vue/composition-api';
import cookies from '@/config/cookies';

export default {
  name: 'SignIn',
  components: {
    BoxedPage,
  },
  setup(props, context) {
    const data = reactive({
      appFound: true,
      usernameOrEmail: '',
      password: '',
      validationErrors: [],
    });

    async function login() {
      try {
        data.validationErrors = [];
        const response = await context.root.axios.post('/auth/sign-in', {
          usernameOrEmail: data.usernameOrEmail,
          password: data.password,
        });
        const callbackURL = cookies.getCookie('callbackURL');
        if (response.status === 200 && callbackURL !== '') {
          window.location.href = callbackURL;
        } else {
          context.root.showFatalError(callbackURL);
        }
      } catch (error) {
        if (error.response && error.response.status === 422) {
          data.validationErrors = context.root.normalizeErrors(error.response);
        } else {
          context.root.showFatalError(error);
        }
      }
    }

    let callbackURL = '';
    if (typeof context.root.$route.query.callbackURL !== 'undefined') {
      const whitelist = [
        process.env.VUE_APP_ACCOUNTS_URL,
        process.env.VUE_APP_WALLET_URL,
        process.env.VUE_APP_GREENHOUSE_URL,
      ];
      const pathArray = context.root.$route.query.callbackURL.split('/');
      const protocol = pathArray[0];
      const host = pathArray[2];
      const url = `${protocol}//${host}`;
      data.appFound = whitelist.includes(url);
      if (data.appFound) {
        callbackURL = encodeURIComponent(context.root.$route.query.callbackURL);
      }
    } else {
      const parts = window.location.hostname.split('.');
      if (parts[0] === 'accounts-dev') {
        parts[0] = 'greenhouse-dev';
      } else {
        parts[0] = 'greenhouse';
      }
      callbackURL = encodeURIComponent(`https://${parts[0]}.${parts[1]}.${parts[2]}`);
    }
    document.cookie = `callbackURL=${callbackURL};domain=${window.location.hostname};path=/;samesite=strict;secure`;

    return { ...toRefs(data), login };
  },
};
</script>
