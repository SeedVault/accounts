<template>
  <div class="container-fluid">
    <div class="form-row">
      <div class="col-sm-4"></div>
      <div class="col-sm-4">
        <div class="text-center">
          <img class="logo" src="@/assets/images/accounts-logo.png" />
          <h2>Sign in</h2>
          <p>
            <strong>
            or
            <router-link :to="{ name: 'registration'}">sign up</router-link>
            </strong>
          </p>
        </div>
        <form @submit.prevent.once="login">

          <input-text v-model="email" id="email" label="E-mail address" placeholder="Your email"
          type="text" icon="outline-mail-24px@2x.svg" :validationErrors="validationErrors"></input-text>

          <input-text v-model="password" id="password" label="Password" placeholder="Your password"
          type="password" icon="outline-lock-24px@2x.svg" :validationErrors="validationErrors"></input-text>

          <fieldset role="group" class="form-group">
            <div role="group">
              <div class="form-row">
                <div class="col order-2" style="text-align: right;">
                  <a href="#">Forgot password?</a>
                </div>
                <div class="col order-1">
                  <input-checkbox v-model="remember" id="remember"
                      label="Keep me logged in"></input-checkbox>
                  </div>
              </div>
            </div>
          </fieldset>

            <input type="submit" id="accept" value="Sign In"
            class="btn btn-primary btn-lg btn-block"/>

        </form>
      </div>
      <div class="col-sm-4"></div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      email: 'foo@bar.com',
      password: 'foobar',
      remember: '1',
      error: false,
      validationErrors: []
    };
  },
  methods: {
    login() {
      var that = this;
      this.validationErrors = [];
      this.axios.post('/server/login', {
        email: this.email,
        password: this.password,
        remember: this.remember
      })
      .then(function (response) {
        window.location.href = response.data.redirect;
      })
      .catch(function (error) {
        if (error.response.status === 422) {
          var data = [];
          error.response.data.errors.forEach(function(result) {
            let err = [];
            let key = result['param'];
            if (key in data) {
              err = data[key];
            } else {
              data[key] = [];
            }
            err.push({msg: result['msg']});
            data[key] = err;
          });
          that.validationErrors = data;
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
