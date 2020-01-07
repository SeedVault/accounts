import Vue from 'vue';
import VueRouter from 'vue-router';
import EmptyRouter from 'seed-theme/src/views/EmptyRouter.vue';
import axios from '@/config/axios';
import i18n from '@/config/i18n';
import store from '@/store/index';
import cookies from '@/config/cookies';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    beforeEnter(to, from, next) {
      let locale = cookies.getCookie('locale');
      if (i18n.availableLocales.includes(locale)) {
        i18n.locale = locale;
      } else {
        const browserLang = navigator.language || navigator.userLanguage;
        if (typeof browserLang !== 'undefined') {
          [locale] = browserLang.split('-');
          if (i18n.availableLocales.includes(locale)) {
            i18n.locale = locale;
          }
        }
      }
      next(`/${i18n.locale}/home`);
    },
  },
  {
    path: '/:locale',
    component: EmptyRouter,
    props: true,
    beforeEnter(to, from, next) {
      const { locale } = to.params;
      if (!i18n.availableLocales.includes(locale)) {
        next('/error/404');
      }
      if (i18n.locale !== locale) {
        i18n.locale = locale;
      }
      store.dispatch('setLang', { lang: i18n.locale });
      next();
    },
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: 'legal/privacy',
        name: 'legal-privacy',
        component: () => import(/* webpackChunkName: "legal" */ '@/views/LegalPrivacy.vue'),
      },
      {
        path: 'legal/terms',
        name: 'legal-terms',
        component: () => import(/* webpackChunkName: "legal" */ '@/views/LegalTerms.vue'),
      },
      {
        path: 'sign-in',
        name: 'sign-in',
        component: () => import(/* webpackChunkName: "auth" */ '@/views/SignIn.vue'),
      },
      {
        path: 'sign-up',
        name: 'sign-up',
        component: () => import(/* webpackChunkName: "auth" */ '@/views/SignUp.vue'),
      },
      {
        path: 'verify-account',
        name: 'verify-account',
        component: () => import(/* webpackChunkName: "auth" */ '@/views/VerifyAccount.vue'),
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: () => import(/* webpackChunkName: "auth" */ '@/views/ForgotPassword.vue'),
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "accounts" */ '@/views/Profile.vue'),
        meta: { authenticated: true },
      },
      {
        path: 'profile/edit',
        name: 'profile-edit',
        component: () => import(/* webpackChunkName: "accounts" */ '@/views/ProfileEdit.vue'),
        meta: { authenticated: true },
      },
      {
        path: 'change-password',
        name: 'change-password',
        component: () => import(/* webpackChunkName: "accounts" */ '@/views/ChangePassword.vue'),
        meta: { authenticated: true },
      },
      {
        path: 'logout',
        name: 'logout',
        beforeEnter(to, from, next) {
          axios.get('/auth/logout').finally(() => {
            store.dispatch('setUser', { user: null });
            store.dispatch('setUserChecked', { userChecked: false });
            next(`/${i18n.locale}/home`);
          });
        },
      },
    ],
  },
  {
    path: '/error/:httpError(\\d+)',
    name: 'error',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "error" */ 'seed-theme/src/views/Error.vue'),
  },
  {
    path: '*',
    redirect: '/error/404',
  },
];

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (!store.getters.userChecked) {
    try {
      const response = await axios.get('/auth/me');
      if (typeof (response.data.csrfToken) !== 'undefined') {
        axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrfToken;
      }
      store.dispatch('setUser', { user: response.data.user });
      store.dispatch('setUserChecked', { userChecked: true });
    } catch (error) {
      if (typeof (error.response.data.csrfToken) !== 'undefined') {
        axios.defaults.headers.common['X-CSRF-TOKEN'] = error.response.data.csrfToken;
      }
      if (error.response.status === 401) { // User is not logged in
        store.dispatch('setUser', { user: null });
        store.dispatch('setUserChecked', { userChecked: false });
      } else {
        // Something went wrong. Just ignore it.
      }
    }
  }

  if (to.matched.some(record => record.meta.authenticated) && !store.getters.user) {
    try {
      const response = await axios.get('/auth/me');
      if (response.status === 200) {
        if (typeof (response.data.csrfToken) !== 'undefined') {
          axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrfToken;
        }
        store.dispatch('setUser', { user: response.data.user });
        store.dispatch('setUserChecked', { userChecked: true });
        document.location.reload();
      }
    } catch (error) {
      // Do nothing
    }
    const callbackURL = `${window.location.protocol}//${window.location.host}${to.path}`;
    window.location.href = `${process.env.VUE_APP_ACCOUNTS_URL}/${i18n.locale}/sign-in?callbackURL=${callbackURL}`;
  } else {
    // eslint-disable-next-line
    if (to.name === 'home' && store.getters.user) {
      next(`/${i18n.locale}/profile`);
    } else {
      next();
    }
  }
});

window.onfocus = async () => {
  if (store.getters.userChecked === true) {
    try {
      const response = await axios.get('/auth/me');
      store.dispatch('setUser', { user: response.data.user });
    } catch (error) {
      if (error.response.status === 401) { // User is not logged in anymore
        store.dispatch('setUser', { user: null });
        store.dispatch('setUserChecked', { userChecked: false });
        document.location = `/${i18n.locale}/home`;
      }
    }
  }
};

export default router;
