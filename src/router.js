import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
// import EmptyRouter from './views/EmptyRouter.vue';
import BoxedLayout from '@/layouts/BoxedLayout.vue';
import i18n from './i18n';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/:locale',
      component: BoxedLayout, // EmptyRouter,
      props: true,
      beforeEnter(to, from, next) {
        const { locale } = to.params;
        if (!i18n.availableLocales.includes(locale)) {
          next('/error/404');
        }
        if (i18n.locale !== locale) {
          i18n.locale = locale;
        }
        next();
      },
      children: [
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
