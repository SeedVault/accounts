import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Data source:
// https://github.com/stefangabos/world_countries/blob/master/data/en/countries.json
export default new Vuex.Store({
  state: {
    lang: 'en',
    userChecked: false,
    user: null,
    logo: '/images/application_logo_accounts.svg',
    allRoles: ['user', 'developer', 'publisher'],
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
        text: 'app.profile',
        icon: 'outline-account_circle-24px@2x.svg',
        target: 'profile-view',
      },
      {
        text: 'app.password',
        icon: 'outline-lock-24px@2x.svg',
        target: 'change-password',
      },
    ],
    apps: [
      {
        text: 'apps.greenhouse',
        icon: 'outline-app-24px@2x.svg',
        url: `${process.env.NODE_ENV === 'production' ? 'https://greenhouse-dev.seedtoken.io' : 'https://127.0.0.1:9002'}/{{ locale }}/dashboard`,
      },
      {
        text: 'apps.wallet',
        icon: 'outline-app-24px@2x.svg',
        url: `${process.env.NODE_ENV === 'production' ? 'https://wallet-dev.seedtoken.io' : 'https://127.0.0.1:9001'}/{{ locale }}/dashboard`,
      },
    ],
  },
  getters: {
    /* eslint-disable no-shadow */
    lang: state => state.lang,
    apps: state => state.apps,
    user: state => state.user,
    userChecked: state => state.userChecked,
    menu: state => state.menu,
    logo: state => state.logo,
    allCountries: state => state.allCountries,
    allRoles: state => state.allRoles,
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
    /* SET_COUNTRIES(state, params) {
      state.countries = countryService.getCountriesByLocale(params.locale);
    }, */
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
    /* setCountriesByLocale({ commit }, params) {
      commit('SET_COUNTRIES', params);
    }, */
  },
});
