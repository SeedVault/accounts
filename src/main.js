import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import './theme/styles/seed.scss';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import InputText from '@/theme/components/InputText.vue';
import InputSelect from '@/theme/components/InputSelect.vue';
import InputCheckbox from '@/theme/components/InputCheckbox.vue';
import IconInsideInput from '@/theme/components/IconInsideInput.vue';
import ValidationMessages from '@/theme/components/ValidationMessages.vue';

// Register global components
Vue.component('input-select', InputSelect);
Vue.component('icon-inside-input', IconInsideInput);
Vue.component('input-text', InputText);
Vue.component('input-checkbox', InputCheckbox);
Vue.component('validation-messages', ValidationMessages);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;
Vue.prototype.axios = axios;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
