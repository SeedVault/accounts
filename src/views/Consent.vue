<template>
  <div class="container-fluid">
    <div class="form-row">
      <div class="col-sm-4"></div>
      <div class="col-sm-4">
        <div class="text-center">
          <img class="logo" :src="app_logo_uri !== '' ?  app_logo_uri: '@/assets/images/accounts-logo.png'" />
          <h2>Authorize App</h2>
          <p>
            Hello {{ user }}!
            <br />
            {{ app_client_name }} is requesting access to your account:
          </p>
        </div>

        <ul class="scopeBox">
          <li v-for="scope in app_scope">
            {{ scope }}
          </li>
        </ul>

        <p class="tos">
          By clicking Allow access, you allow this app to use your information in
          accordance with their respective <a target="_blank" :href="app_tos_uri"> Terms of Service</a>
          and <a target="_blank" :href="app_policy_uri">Privacy policies</a>.
          </p>
        <form @submit.prevent.once="login">

            <div class="row">
            <div class="col-6">
              <input type="submit" id="reject" name="reject" value="Reject" class="btn btn-secondary btn-lg btn-block" />
            </div>
            <div class="col-6">
              <input type="submit" id="allow" name="allow" value="Accept" class="btn btn-primary btn-lg btn-block" />
            </div>
           </div>

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
      app_client_name: '',
      app_logo_uri: '',
      app_policy_uri: '',
      app_scope: [],
      app_tos_uri: '',
      request_scope: '',
      user: ''
    }
  },
  mounted: function () {
    const q = JSON.parse(this.$route.query.data);
    this.app_client_name = q.app_client_name;
    this.app_logo_uri = q.app_logo_uri;
    this.app_policy_uri = q.app_policy_uri;
    this.app_scope = q.app_scope;
    for (var i=0; i < this.app_scope.length; i++) {
      switch(this.app_scope[i]) {
        case 'openid':
          this.app_scope[i] = 'Your profile: username, email, profile picture.';
          break;
        case 'offline':
          this.app_scope[i] = 'Offline access.';
          break;
      }
    }
    this.app_tos_uri = q.app_tos_uri;
    this.request_scope = q.request_scope;
    this.user = q.user;
  },
  methods: {
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

p.tos {
  font-size: 80%;
  font-weight: 400;
  color: #777;
  margin: 30px;
}

.scopeBox {
  border: 1px solid #ccc;
  padding: 20px 40px;
  border-radius: 5px;
  margin-top: 30px;
}
</style>
