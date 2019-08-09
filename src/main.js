import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'seed-theme/src/styles/seed.scss';
import Icon from 'seed-theme/src/components/Icon.vue';
import InputText from 'seed-theme/src/components/InputText.vue';
import InputPassword from 'seed-theme/src/components/InputPassword.vue';
import InputSelect from 'seed-theme/src/components/InputSelect.vue';
import InputCheckbox from 'seed-theme/src/components/InputCheckbox.vue';
import LocaleChanger from 'seed-theme/src/components/LocaleChanger.vue';
import IconInsideInput from 'seed-theme/src/components/IconInsideInput.vue';
import ValidationBox from 'seed-theme/src/components/ValidationBox.vue';
import ValidationMessages from 'seed-theme/src/components/ValidationMessages.vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';

// Register global components
Vue.component('icon', Icon);
Vue.component('input-select', InputSelect);
Vue.component('icon-inside-input', IconInsideInput);
Vue.component('input-text', InputText);
Vue.component('input-password', InputPassword);
Vue.component('input-checkbox', InputCheckbox);
Vue.component('locale-changer', LocaleChanger);
Vue.component('validation-box', ValidationBox);
Vue.component('validation-messages', ValidationMessages);

Vue.use(BootstrapVue);
Vue.config.productionTip = false;
Vue.prototype.axios = axios;

// Register function to normalize mongoose validation messages
Vue.prototype.normalizeErrors = (errors) => {
  const data = [];
  for (const [key, value] of Object.entries(errors.data.errors)) {
    data[key] = [{ msg: value.message }];
  }
  return data;
};

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
