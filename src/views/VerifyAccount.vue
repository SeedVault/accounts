<template>
  <boxed-page>
    <template v-slot:main>

      <centered-error-box
        icon="error-red"
        :message="$t('domain.user.validation.user_not_found')"
        v-if="!userFound"
      />

      <div v-if="userFound">

        <loading-checkmark visible="true" :loading="loading" :showCheckmark="verified">
          <template v-slot:icons>
            <img
            :src="require('../../node_modules/seed-theme/src/assets/icons/mail-primary.svg?data')"
            class="envelope-icon" v-show="sent && !loading && !verified" />
          </template>
          <template v-slot:messages>
            <div v-if="loading && !sent">
              {{ $t('verify_account.sending_email') }}
            </div>
            <div v-if="loading && sent && !verified">
              {{ $t('verify_account.verifying_code') }}
            </div>
            <div v-if="verified">
              {{ $t('verify_account.verified') }}
            </div>
          </template>
        </loading-checkmark>


        <div id="code-form" v-if="sent && !loading && !verified">

          <validation-box id="_" :validationErrors="validationErrors"></validation-box>

          <form @submit.prevent="submit">

            <input-text v-model="verificationCode" id="verificationCode"
            :label="$t('verify_account.please_enter_code')"
            :placeholder="$t('verify_account.your_verification_code')" icon="lock"
            :validationErrors="validationErrors"></input-text>

            <vue-recaptcha
            ref="recaptcha"
            @verify="verify"
            @expired="onCaptchaExpired"
            size="invisible"
            :sitekey="getRecaptchaSiteKey()"
            :loadRecaptchaScript="true"
            ></vue-recaptcha>

            <input type="submit" id="verify" :value="$t('verify_account.verify')"
            class="btn btn-primary btn-lg btn-block font-weight-bold"/>

            <div class="mt-4 text-center resend">
              <a @click="sendMail">{{ $t('verify_account.resend_email') }}</a>
            </div>

          </form>
        </div>

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
      userFound: true,
      loading: false,
      sent: false,
      verified: false,
      verificationCode: '',
      validationErrors: [],
    });

    async function sendMail() {
      try {
        data.validationErrors = [];
        data.loading = true;
        data.sent = false;
        await context.root.axios.post('/auth/send-verification-email', {
          email: context.root.$route.query.email,
          locale: context.root.$i18n.locale,
        });
        setTimeout(() => { }, 1000);
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
        const response = await context.root.axios.post('/auth/verify-email-code', {
          email: context.root.$route.query.email,
          verificationCode: data.verificationCode,
          recaptchaToken,
        });
        data.loading = false;
        data.verified = true;
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

    sendMail();

    return {
      ...toRefs(data),
      sendMail,
      verify,
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

.resend {
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}
</style>
