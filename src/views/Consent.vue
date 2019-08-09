<template>
  <div class="text-left">
    <div class="text-center">
      <!-- <img class="logo"
      :src="app_logo_uri !== '' ?  app_logo_uri: '@/assets/images/accounts-logo.png'" />  -->
      <h2>{{ $t('consent.authorize_app') }}</h2>
      <p>
        <i18n path="consent.hello_user">
          <span place="user">{{ user }}</span>
        </i18n>
        <br />
      </p>

    </div>
    <div class="scopeBox">
      <div class="text-center">
        <img class="logo"
      :src="app_logo_uri !== '' ?  app_logo_uri: '@/assets/images/accounts-logo.png'" />
      </div>
      <p class="prompt">
        <br />
        <i18n path="consent.app_requests_access">
          <span place="app_client_name">{{ app_client_name }}</span>
        </i18n>
      </p>
      <ul>
        <li v-for="scope in app_scope" :key="scope">
          {{ $t(scope) }}
        </li>
      </ul>
    </div>

    <p class="tos">
      <i18n path="consent.legal_disclamer">
        <a place="terms" target="_blank" :href="app_tos_uri">{{ $t('consent.terms') }}</a>
        <a place="privacy_policies" target="_blank" :href="app_policy_uri">{{ $t('consent.privacy_policies') }}</a>
      </i18n>
    </p>

    <form @submit.prevent="submit">
      <input id="grant_scope" name="grant_scope" type="hidden"
      :value="requested_scope" />
      <div class="row">
        <div class="col-6">
          <input type="button" @click="consent(false)" id="reject"
          name="reject" :value="$t('common.reject')"
          class="btn btn-secondary btn-lg btn-block" />
        </div>
        <div class="col-6">
          <input type="button" @click="consent(true)" id="allow"
          name="allow" :value="$t('common.accept')"
          class="btn btn-primary btn-lg btn-block" />
        </div>
      </div>
    </form>
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
      requested_scope: '',
      user: '',
    };
  },
  mounted() {
    const q = JSON.parse(this.$route.query.data);
    this.app_client_name = q.app_client_name;
    this.app_logo_uri = q.app_logo_uri;
    this.app_policy_uri = q.app_policy_uri;
    this.app_scope = q.app_scope;
    for (let i = 0; i < this.app_scope.length; i += 1) {
      switch (this.app_scope[i]) {
        case 'openid':
          this.app_scope[i] = 'consent.scope.openid';
          break;
        case 'offline':
          this.app_scope[i] = 'consent.scope.offline';
          break;
        default:
          // use default value
          break;
      }
    }
    this.app_tos_uri = q.app_tos_uri;
    this.requested_scope = q.requested_scope;
    this.user = q.user;
  },
  methods: {
    consent(allowValue) {
      // const that = this;
      this.axios.post(`/${this.$i18n.locale}/auth/consent`, {
        allow: allowValue,
        grant_scope: this.requested_scope.split(','),
      })
        .then((response) => {
          window.location.href = response.data.redirect;
        })
        .catch((error) => {
          alert(error.response.status);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  text-align: center;
  margin-bottom: 10px;
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

p.prompt {
  color: #777;
}

.scopeBox {
  border: 1px solid #ccc;
  // padding: 20px 40px;
  padding: 30px;
  border-radius: 5px;
  margin-top: 30px;

  ul {
    list-style-type: square;
  }
}
</style>
