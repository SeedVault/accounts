<template>
  <div class="text-left">
    <div class="text-center">
      <h2>{{ $t('sign_in.sign_in') }}</h2>
      <p>
        <strong>
        {{ $t('sign_in.or') }}
        <router-link :to="{ name: 'sign-up'}">{{ $t('sign_in.sign_up') }}</router-link>
        </strong>
      </p>
    </div>

    <validation-box id="_" :validationErrors="validationErrors"></validation-box>

    <form @submit.prevent="login">

      <input-text v-model="email" id="email" :label="$t('domain.user.email_address')"
      :placeholder="$t('domain.user.your_email_address')" icon="outline-mail-24px@2x.svg"
      :validationErrors="validationErrors"></input-text>

      <input-password v-model="password" id="password" :label="$t('domain.user.password')"
      :placeholder="$t('domain.user.your_password')" icon="outline-lock-24px@2x.svg"
      :validationErrors="validationErrors"></input-password>

      <fieldset role="group" class="form-group">
        <div role="group">
          <div class="form-row">
            <div class="col order-2" style="text-align: right;">
              <router-link :to="{ name: 'forgot-password'}">{{ $t('sign_in.forgot_password') }}</router-link>
            </div>
            <div class="col order-1">
              <input-checkbox v-model="remember" id="remember"
                :label="$t('sign_in.keep_me_logged_in')"></input-checkbox>
              </div>
          </div>
        </div>
      </fieldset>

        <input type="submit" id="accept" :value="$t('sign_in.sign_in_button')"
        class="btn btn-primary btn-lg btn-block"/>

    </form>

  </div>


</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      remember: '0',
      error: false,
      validationErrors: [],
    };
  },
  methods: {
    login() {
      const that = this;
      this.validationErrors = [];
      this.axios.post(`/${this.$i18n.locale}/auth/sign-in`, {
        email: this.email,
        password: this.password,
        remember: this.remember,
      })
        .then((response) => {
          window.location.href = response.data.redirect;
        })
        .catch((error) => {
          if (error.response.status === 422) {
            that.validationErrors = this.normalizeErrors(error.response);
            if (this.validationErrors._[0].msg === 'domain.user.validation.account_unverified') {
              this.$router.push({ name: 'verify-account', query: { email: this.email } });
            }
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
</style>
