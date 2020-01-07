import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lang: 'en',
    userChecked: false,
    user: null,
    csrf: null,
    allRoles: ['developer', 'publisher', 'user', 'administrator', 'node operator', 'researcher'],
    allCountries: [
      'af', 'al', 'dz', 'ad', 'ao', 'ag', 'ar', 'am', 'au', 'at', 'az', 'bs',
      'bh', 'bd', 'bb', 'by', 'be', 'bz', 'bj', 'bt', 'bo', 'ba', 'bw', 'br',
      'bn', 'bg', 'bf', 'bi', 'cv', 'kh', 'cm', 'ca', 'cf', 'td', 'cl', 'cn',
      'co', 'km', 'cg', 'cd', 'cr', 'ci', 'hr', 'cu', 'cy', 'cz', 'dk', 'dj',
      'dm', 'do', 'ec', 'eg', 'sv', 'gq', 'er', 'ee', 'sz', 'et', 'fj', 'fi',
      'fr', 'ga', 'gm', 'ge', 'de', 'gh', 'gr', 'gd', 'gt', 'gn', 'gw', 'gy',
      'ht', 'hn', 'hu', 'is', 'in', 'id', 'ir', 'iq', 'ie', 'il', 'it', 'jm',
      'jp', 'jo', 'kz', 'ke', 'ki', 'kp', 'kr', 'kw', 'kg', 'la', 'lv', 'lb',
      'ls', 'lr', 'ly', 'li', 'lt', 'lu', 'mg', 'mw', 'my', 'mv', 'ml', 'mt',
      'mh', 'mr', 'mu', 'mx', 'fm', 'md', 'mc', 'mn', 'me', 'ma', 'mz', 'mm',
      'na', 'nr', 'np', 'nl', 'nz', 'ni', 'ne', 'ng', 'mk', 'no', 'om', 'pk',
      'pw', 'pa', 'pg', 'py', 'pe', 'ph', 'pl', 'pt', 'qa', 'ro', 'ru', 'rw',
      'kn', 'lc', 'vc', 'ws', 'sm', 'st', 'sa', 'sn', 'rs', 'sc', 'sl', 'sg',
      'sk', 'si', 'sb', 'so', 'za', 'ss', 'es', 'lk', 'sd', 'sr', 'se', 'ch',
      'sy', 'tj', 'tz', 'th', 'tl', 'tg', 'to', 'tt', 'tn', 'tr', 'tm', 'tv',
      'ug', 'ua', 'ae', 'gb', 'us', 'uy', 'uz', 'vu', 've', 'vn', 'ye', 'zm',
      'zw',
    ],
    menu: [
      {
        id: 1,
        text: 'app.profile',
        icon: 'account-circle',
        target: 'profile',
      },
      {
        id: 2,
        text: 'app.password',
        icon: 'lock',
        target: 'change-password',
      },
      {
        id: 3,
        type: 'divider',
        text: '',
        icon: '',
      },
      {
        id: 4,
        text: 'apps.greenhouse',
        icon: 'seed-app',
        url: `${process.env.VUE_APP_GREENHOUSE_URL}/{{ locale }}/dashboard`,
      },
      {
        id: 5,
        text: 'apps.wallet',
        icon: 'seed-app',
        url: `${process.env.VUE_APP_WALLET_URL}/{{ locale }}/dashboard`,
      },
      {
        id: 6,
        type: 'divider',
        text: '',
        icon: '',
      },
      {
        id: 7,
        text: 'app.sign_out',
        icon: 'exit',
        url: `${process.env.VUE_APP_ACCOUNTS_URL}/{{ locale }}/logout`,
      },
    ],
  },
  getters: {
    lang: state => state.lang,
    user: state => state.user,
    userChecked: state => state.userChecked,
    csrf: state => state.csrf,
    allRoles: state => state.allRoles,
    allCountries: state => state.allCountries,
    menu: state => state.menu,
  },
  mutations: {
    SET_LANG(state, params) {
      state.lang = params.lang;
    },
    SET_USER(state, params) {
      state.user = params.user;
    },
    SET_USER_CHECKED(state, params) {
      state.userChecked = params.userChecked;
    },
    SET_CSRF(state, params) {
      state.csrf = params.csrf;
    },
  },
  actions: {
    setLang({ commit }, params) {
      commit('SET_LANG', params);
    },
    setUser({ commit }, params) {
      commit('SET_USER', params);
    },
    setUserChecked({ commit }, params) {
      commit('SET_USER_CHECKED', params);
    },
    setCsrf({ commit }, params) {
      commit('SET_CSRF', params);
    },
  },
  modules: {
  },
});
