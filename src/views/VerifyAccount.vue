<template>
  <div class="text-left">


    <div id="user-not-found" class="text-center" v-if="userNotFound">
      <img :src="require('@/assets/icons/outline-error_outline-20px@2x.svg')"
        class="icon not-found-icon" />
      <h3 class="error">{{ $t('domain.user.validation.user_not_found') }}</h3>
    </div>

    <div v-if="!userNotFound">


      <div id="sending" class="text-center">
        <div v-bind:class="[{ 'load-complete': !loading }, 'circle-loader']">
          <div class="checkmark draw" v-show="verified"></div>
          <img :src="require('@/assets/icons/outline-mail-primary-24px@2x.svg')"
          class="icon envelope-icon" v-show="sent && !loading && !verified" />
        </div>
        <div v-if="loading && !sent">
          {{ $t('verify_account.sending_email') }}
        </div>
        <div v-if="loading && sent && !verified">
          {{ $t('verify_account.verifying_code') }}
        </div>
        <div v-if="verified">
          {{ $t('verify_account.verified') }}
        </div>
      </div>


      <div id="code-form" v-if="sent && !loading && !verified">

        <validation-box id="_" :validationErrors="validationErrors"></validation-box>

        <form @submit.prevent="verify">

          <input-text v-model="verificationCode" id="verificationCode"
          :label="$t('verify_account.please_enter_code')"
          :placeholder="$t('verify_account.your_verification_code')"
          type="text" icon="outline-lock-24px@2x.svg"
          :validationErrors="validationErrors"></input-text>

          <input type="submit" id="verify" :value="$t('verify_account.verify')"
          class="btn btn-primary btn-lg btn-block"/>

          <div class="resend-email-area">
            <a @click="sendMail">{{ $t('verify_account.resend_email') }}</a>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      userNotFound: false,
      loading: false,
      sent: false,
      verified: false,
      verificationCode: '',
      validationErrors: [],
    };
  },
  created() {
    this.sendMail();
  },
  methods: {
    sendMail() {
      this.validationErrors = [];
      this.loading = true;
      this.sent = false;
      this.code = '';
      const that = this;
      this.axios.post(`/${this.$i18n.locale}/auth/send-verification-email`, {
        email: this.$route.query.email,
      })
        .then(() => {
          // const that = this;
          setTimeout(() => { that.sent = true; that.loading = false; }, 1000);
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
        email: this.$route.query.email,
        verificationCode: this.verificationCode,
      })
        .then((response) => {
          const that = this;
          this.loading = false;
          this.verified = true;
          setTimeout(() => {
            window.location.href = response.data.redirect;
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
  margin-bottom: 5px;
}

h3.error {
  color: #f5296a;
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

.not-found-icon {
  width:90px;
  padding-top:22px;
  margin-bottom: 30px;
}
</style>
