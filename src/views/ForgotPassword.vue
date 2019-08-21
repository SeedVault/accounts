<template>
  <div class="text-left">

    <div class="text-center" v-if="!loading">
      <h2>{{ $t(title) }}</h2>
    </div>

    <div id="enter-email" v-if="!loading && !found">
      <div class="text-center">
        <p class="instructions">{{ $t('forgot_password.instructions') }}</p>
      </div>
      <validation-box id="_" :validationErrors="validationErrors"></validation-box>
      <form @submit.prevent="sendMail">
        <input-text v-model="email" id="email" :label="$t('domain.user.email_address')"
        :placeholder="$t('domain.user.your_email_address')" type="text"
        icon="outline-mail-24px@2x.svg"
        :validationErrors="validationErrors"></input-text>
        <input type="submit" id="verify" :value="$t('forgot_password.send_code')"
          class="btn btn-primary btn-lg btn-block"/>
      </form>
    </div>

    <div id="sending" class="text-center" v-if="loading || found">
      <div v-bind:class="[{ 'load-complete': !loading }, 'circle-loader']">
        <div class="checkmark draw" v-show="reseted"></div>
        <img :src="require('@/assets/icons/outline-mail-primary-24px@2x.svg')"
        class="icon envelope-icon" v-show="sent && !loading && !verified" />
        <img :src="require('@/assets/icons/outline-lock-primary-24px@2x.svg')"
        class="icon lock-icon" v-show="verified && !loading && !reseted" />
      </div>
      <div v-if="loading && !sent">
        {{ $t('forgot_password.sending_email') }}
      </div>
      <div v-if="loading && sent && !verified">
        {{ $t('forgot_password.verifying_code') }}
      </div>
      <div v-if="reseted">
        {{ $t('forgot_password.reseted') }}
      </div>
    </div>

    <div id="code-form" v-if="!loading && sent && found && !verified">
      <validation-box id="_" :validationErrors="validationErrors"></validation-box>
      <form @submit.prevent="verify">
        <input-text v-model="verificationCode" id="verificationCode"
        :label="$t('forgot_password.please_enter_code')"
        :placeholder="$t('forgot_password.your_verification_code')"
        type="text" icon="outline-lock-24px@2x.svg"
        :validationErrors="validationErrors"></input-text>
        <input type="submit" id="verify" :value="$t('forgot_password.verify_code')"
        class="btn btn-primary btn-lg btn-block"/>
        <div class="resend-email-area">
          <a @click="sendMail">{{ $t('forgot_password.resend_email') }}</a>
        </div>
      </form>
    </div>

    <div id="password-form" v-if="!loading && sent && found && verified && !reseted">
      <validation-box id="_" :validationErrors="validationErrors"></validation-box>
      <form @submit.prevent="changePassword">
        <input-password v-model="newPassword" id="newPassword" :label="$t('domain.user.new_password')"
        :placeholder="$t('domain.user.your_new_password')" icon="outline-lock-24px@2x.svg"
        :validationErrors="validationErrors"></input-password>
        <input-password v-model="repeatNewPassword" id="repeatNewPassword" :label="$t('domain.user.re_enter_new_password')"
        :placeholder="$t('domain.user.your_new_password_again')" icon="outline-lock-24px@2x.svg"
        :validationErrors="validationErrors"></input-password>
        <input type="submit" id="changePassword" :value="$t('forgot_password.change_password')"
        class="btn btn-primary btn-lg btn-block"/>
      </form>
    </div>

  </div>
</template>

<script>
import BoxedLayoutVue from '../layouts/BoxedLayout.vue';

export default {
  data() {
    return {
      title: 'forgot_password.forgot_your_password',
      email: '',
      found: false,
      userNotFound: false,
      loading: false,
      sent: false,
      verified: false,
      reseted: false,
      newPassword: '',
      repeatNewPassword: '',
      verificationCode: '',
      validationErrors: [],
    };
  },
  methods: {
    sendMail() {
      this.validationErrors = [];
      this.found = false;
      this.loading = true;
      this.sent = false;
      this.code = '';
      this.redirUrl = '';
      const that = this;
      this.axios.post(`/${this.$i18n.locale}/auth/send-verification-email`, {
        email: this.email,
      })
        .then(() => {
          // const that = this;
          this.found = true;
          setTimeout(() => {
            that.sent = true;
            that.loading = false;
            that.title = 'forgot_password.check_your_email';
          }, 1000);
        })
        .catch((error) => {
          this.sent = true;
          this.loading = false;
          if (error.response.status === 422) {
            this.validationErrors = this.normalizeErrors(error.response);
            this.userNotFound = (this.validationErrors._[0].msg
            === 'domain.user.validation.user_not_found');
          } else {
            alert(`Something went wrong: ${error.response.status}`);
          }
        });
    },
    verify() {
      this.validationErrors = [];
      this.loading = true;
      this.verified = false;
      this.axios.post(`/${this.$i18n.locale}/auth/verify-email-code`, {
        email: this.email,
        verificationCode: this.verificationCode,
      })
        .then((response) => {
          const that = this;
          this.loading = false;
          this.verified = true;
          that.title = 'forgot_password.change_your_password';
          setTimeout(() => {
            that.redirUrl = response.data.redirect;
          }, 1000);
        })
        .catch((error) => {
          this.loading = false;
          if (error.response.status === 422) {
            this.validationErrors = this.normalizeErrors(error.response);
          } else {
            alert(`Something went wrong: ${error.response.status}`);
          }
        });
    },
    changePassword() {
      this.validationErrors = [];
      this.loading = true;
      this.reseted = false;
      this.axios.post(`/${this.$i18n.locale}/auth/forgot-password`, {
        email: this.email,
        verificationCode: this.verificationCode,
        newPassword: this.newPassword,
        repeatNewPassword: this.repeatNewPassword,
      })
        .then((response) => {
          const that = this;
          this.loading = false;
          this.reseted = true;
          that.title = '';
          setTimeout(() => {
            window.location.href = that.redirUrl;
          }, 1000);
        })
        .catch((error) => {
          this.loading = false;
          if (error.response.status === 422) {
            this.validationErrors = this.normalizeErrors(error.response);
          } else {
            alert(`Something went wrong: ${error.response.status}`);
          }
        });
    },
  },
};

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
  margin-bottom: 20px;
}

p.instructions {
  color: #777;
  margin-bottom: 50px;
}

.resend-email-area {
  margin-top: 30px;
  text-align: center;

  a {
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
}

.envelope-icon {
  width:40px;
  padding-top:22px;
}

.lock-icon {
  width:35px;
  padding-top:12px;
}

.not-found-icon {
  width:90px;
  padding-top:22px;
  margin-bottom: 30px;
}
</style>
