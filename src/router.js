import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';
import EmptyRouter from './views/EmptyRouter.vue';
import i18n from './i18n';
import store from './store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  base: process.env.BASE_URL,
  routes: [
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
          component: () => import(/* webpackChunkName: "auth" */ './views/Home.vue'),
        },
        {
          path: 'legal/policy',
          name: 'legal-privacy',
          component: () => import(/* webpackChunkName: "auth" */ './views/LegalPrivacy.vue'),
        },
        {
          path: 'legal/tos',
          name: 'legal-terms',
          component: () => import(/* webpackChunkName: "auth" */ './views/LegalTerms.vue'),
        },
        {
          path: 'sign-in',
          name: 'sign-in',
          component: () => import(/* webpackChunkName: "auth" */ './views/SignIn.vue'),
        },
        {
          path: 'forgot-password',
          name: 'forgot-password',
          component: () => import(/* webpackChunkName: "auth" */ './views/ForgotPassword.vue'),
        },
        {
          path: 'sign-up',
          name: 'sign-up',
          component: () => import(/* webpackChunkName: "auth" */ './views/SignUp.vue'),
        },
        {
          path: 'verify-account',
          name: 'verify-account',
          component: () => import(/* webpackChunkName: "auth" */ './views/VerifyAccount.vue'),
        },
        {
          path: 'consent',
          name: 'consent',
          component: () => import(/* webpackChunkName: "auth" */ './views/Consent.vue'),
        },
        {
          path: 'profile',
          name: 'profile-view',
          component: () => import(/* webpackChunkName: "accounts" */ './views/ProfileView.vue'),
          meta: { authenticated: true },
        },
        {
          path: 'profile/edit',
          name: 'profile-form',
          component: () => import(/* webpackChunkName: "accounts" */ './views/ProfileForm.vue'),
          meta: { authenticated: true },
        },
        {
          path: 'password',
          name: 'change-password',
          component: () => import(/* webpackChunkName: "accounts" */ './views/ChangePassword.vue'),
          meta: { authenticated: true },
        },
        {
          path: 'referral-codes/report',
          name: 'referral-codes-report',
          /* eslint-ignore-next-line import/no-unresolved */
          component: () => import(/* webpackChunkName: "accounts" */ './views/ReferralCodesReport.vue'),
          meta: { authenticated: true },
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
      component: () => import(/* webpackChunkName: "error" */ './views/Error.vue'),
    },
    /* {
      path: '*',
      redirect: '/error/404',
    }, */
  ],
});

router.beforeEach(async (to, from, next) => {
  if (!store.getters.userChecked) {
    try {
      const response = await axios.get('/auth/me');
      store.dispatch('setUser', { user: response.data });
      store.dispatch('setUserChecked', { userChecked: true });
    } catch (error) {
      if (error.response.status === 403) {
        store.dispatch('setUser', { user: null });
        store.dispatch('setUserChecked', { userChecked: true });
      } else {
        // Something went wrong. Ignore it.
      }
    }
  }

  if (to.matched.some(record => record.meta.authenticated) && !store.getters.user) {
    window.location.href = '/auth/do-login';
  } else {
    next();
  }
});

export default router;
