<template>
  <boxed-page>
    <template v-slot:main>

      <h1 class="display-1 text-dark text-center mb-4" v-if="!loading">
        {{ $t(title) }}
      </h1>

      <div v-if="!loading && !userFound">
        <div class="text-center">
          <p class="text-center text-black-50 mb-4">
            {{ $t('forgot_password.instructions') }}
          </p>
        </div>
        <validation-box id="_" :validationErrors="validationErrors"></validation-box>
        <form @submit.prevent="sendMail">
          <input-text v-model="email" id="email"
          :label="$t('domain.user.email_address')"
          :placeholder="$t('domain.user.your_email_address')" icon="mail"
          :validationErrors="validationErrors">
          </input-text>
          <input type="submit" id="verify" :value="$t('forgot_password.send_code')"
            class="btn btn-primary btn-lg btn-block font-weight-bold"/>
        </form>
      </div>

      <div v-if="loading || userFound">
        <loading-checkmark visible="true" :loading="loading" :showCheckmark="reseted">
          <template v-slot:icons>
            <img
            :src="require('../../node_modules/seed-theme/src/assets/icons/mail-primary.svg?data')"
            class="envelope-icon" v-show="sent && !loading && !verified" />
            <img
            :src="require('../../node_modules/seed-theme/src/assets/icons/lock-primary.svg?data')"
            class="lock-icon" v-show="verified && !loading && !reseted" />
          </template>
          <template v-slot:messages>
            <div v-if="loading && !sent">
              {{ $t('verify_account.sending_email') }}
            </div>
            <div v-if="loading && sent && !verified">
              {{ $t('verify_account.verifying_code') }}
            </div>
            <div v-if="reseted">
              {{ $t('forgot_password.reseted') }}
            </div>
          </template>
        </loading-checkmark>
      </div>


      <div v-if="!loading && sent && userFound && !verified">
        <validation-box id="_" :validationErrors="validationErrors"></validation-box>
        <form @submit.prevent="submit">
          <input-text v-model="verificationCode" id="verificationCode"
          :label="$t('forgot_password.please_enter_code')"
          :placeholder="$t('forgot_password.your_verification_code')" icon="lock"
          :validationErrors="validationErrors"></input-text>
          <input type="submit" id="verify" :value="$t('forgot_password.verify_code')"
          class="btn btn-primary btn-lg btn-block font-weight-bold"/>
          <vue-recaptcha
          ref="recaptcha"
          @verify="verify"
          @expired="onCaptchaExpired"
          size="invisible"
          :sitekey="getRecaptchaSiteKey()"
          :loadRecaptchaScript="true"
          ></vue-recaptcha>
          <div class="mt-4 text-center resend">
            <a @click="sendMail">{{ $t('forgot_password.resend_email') }}</a>
            </div>
        </form>
      </div>


      <div v-if="!loading && sent && userFound && verified && !reseted">
        <validation-box id="_" :validationErrors="validationErrors"></validation-box>
        <form @submit.prevent="changePassword">
          <input-password v-model="newPassword" id="newPassword"
          :label="$t('domain.user.new_password')"
          :placeholder="$t('domain.user.your_new_password')" icon="lock"
          :validationErrors="validationErrors"></input-password>
          <input-password v-model="repeatNewPassword" id="repeatNewPassword"
          :label="$t('domain.user.re_enter_new_password')"
          :placeholder="$t('domain.user.your_new_password_again')" icon="lock"
          :validationErrors="validationErrors"></input-password>
          <input type="submit" id="changePassword" :value="$t('forgot_password.change_password')"
          class="btn btn-primary btn-lg btn-block font-weight-bold"/>
        </form>
      </div>


    </template>
  </boxed-page>
</template>

<script>
import BoxedPage from 'seed-theme/src/layouts/BoxedPage.vue';
import VueRecaptcha from 'vue-recaptcha';
import { reactive, toRefs } from '@vue/composition-api';
import cookies from '@/config/cookies';

export default {
  name: 'VerifyAccount',
  components: {
    BoxedPage,
    VueRecaptcha,
  },
  setup(props, context) {
    const data = reactive({
      title: 'forgot_password.forgot_your_password',
      email: '',
      userFound: false,
      loading: false,
      sent: false,
      verified: false,
      reseted: false,
      newPassword: '',
      repeatNewPassword: '',
      verificationCode: '',
      validationErrors: [],
    });

    async function sendMail() {
      try {
        data.validationErrors = [];
        data.loading = true;
        data.sent = false;
        data.userFound = false;
        await context.root.axios.post('/auth/send-verification-email', {
          email: data.email,
          locale: context.root.$i18n.locale,
        });
        setTimeout(() => { }, 1000);
        data.userFound = true;
        data.title = 'forgot_password.check_your_email';
      } catch (error) {
        if (error.response && error.response.status === 422) {
          data.validationErrors = context.root.normalizeErrors(error.response);
          data.userFound = (data.validationErrors._[0].msg
            !== 'domain.user.validation.user_not_found');
        } else {
          context.root.showFatalError(error);
        }
      } finally {
        data.sent = true;
        data.loading = false;
      }
    }

    function getRecaptchaSiteKey() {
      return process.env.VUE_APP_RECAPTCHA_SITE_KEY;
    }

    function submit() {
      context.refs.recaptcha.execute();
    }

    function onCaptchaExpired() {
      context.refs.recaptcha.reset();
    }

    async function verify(recaptchaToken) {
      try {
        data.validationErrors = [];
        data.loading = true;
        data.verified = false;
        await context.root.axios.post('/auth/verify-email-code', {
          email: data.email,
          verificationCode: data.verificationCode,
          recaptchaToken,
        });
        data.verified = true;
        data.title = 'forgot_password.change_your_password';
        setTimeout(() => { }, 1000);
      } catch (error) {
        if (error.response && error.response.status === 422) {
          data.validationErrors = context.root.normalizeErrors(error.response);
        } else {
          context.root.showFatalError(error);
        }
      } finally {
        data.loading = false;
      }
    }


    async function changePassword() {
      try {
        data.validationErrors = [];
        data.loading = true;
        data.reseted = false;
        const response = await context.root.axios.post('/auth/forgot-password', {
          email: data.email,
          verificationCode: data.verificationCode,
          newPassword: data.newPassword,
          repeatNewPassword: data.repeatNewPassword,
        });
        data.reseted = true;
        data.title = '';
        setTimeout(() => { }, 1000);
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
      } finally {
        data.loading = false;
      }
    }

    return {
      ...toRefs(data),
      sendMail,
      verify,
      changePassword,
      submit,
      onCaptchaExpired,
      getRecaptchaSiteKey,
    };
  },
};
</script>

<style lang="scss" scoped>
.envelope-icon {
  width:40px;
  padding-top:22px;
}

.lock-icon {
  width:35px;
  padding-top:12px;
}

.resend {
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}
</style>
