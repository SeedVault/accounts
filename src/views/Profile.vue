<template>
  <app-page>
    <template v-slot:main>
      <full-centered v-slot:main v-if="loading || oops">
        <loading-checkmark visible="false" :loading="loading" v-if="!oops"></loading-checkmark>
        <oops v-show="oops"></oops>
      </full-centered>

      <simple-box :title="$t('app.profile')" v-show="!loading && !oops">
        <div class="row">
          <div class="col-xl-3 text-center">
            <picture-changer ref="pictureChanger" @picture-saved="onPictureSaved">
            </picture-changer>
          </div>
          <div class="col-xl-7 text-center text-xl-left">
            <h1 class="h3">{{ profile.fullname }}</h1>
            <h2 class="h5 text-black-50 mb-5">@{{ profile.username }}</h2>
            <div class="d-flex flex-row bd-highlight mb-3 justify-content-center
            justify-content-xl-start">
              <div class="icon text-right mr-2"><icon icon="mail" /></div>
              <div class="">{{ profile.email }}</div>
            </div>
            <div class="d-flex flex-row bd-highlight mb-3 justify-content-center
            justify-content-xl-start">
              <div class="icon text-right mr-2"><icon icon="location" /></div>
              <div class="">{{ countryName(profile.countryCode) }}</div>
            </div>
          </div>
          <div class="col-xl-2">
            <button type="submit" class="btn btn-md btn-primary btn-block font-weight-bold mb-2"
              @click="editProfile()">{{ $t('common.modify') }}</button>
            </div>
        </div>
      </simple-box>

    </template>
    <router-view/>
  </app-page>
</template>

<script>
import AppPage from 'seed-theme/src/layouts/AppPage.vue';
import PictureChanger from 'seed-theme/src/components/PictureChanger.vue';
import { reactive, toRefs } from '@vue/composition-api';

export default {
  name: 'Profile',
  components: {
    AppPage,
    PictureChanger,
  },
  setup(props, context) {
    const data = reactive({
      loading: false,
      oops: false,
      profile: {},
    });

    async function getProfile() {
      try {
        data.loading = true;
        data.oops = false;
        data.validationErrors = [];
        const response = await context.root.axios.get('/profile/me');
        data.profile = response.data;
        context.refs.pictureChanger.loadImage(
          data.profile.pictureUrl,
          `${context.root.$store.getters.user.id}.jpg`,
          '/profile/me/change-picture',
        );
        data.loading = false;
      } catch (error) {
        data.loading = false;
        data.oops = true;
      }
    }

    function onPictureSaved(newPictureUrl) {
      const currentUser = context.root.$store.getters.user;
      currentUser.picture = newPictureUrl;
      context.root.$store.dispatch('setUser', { user: currentUser });
    }

    function editProfile() {
      context.root.$router.push({ name: 'profile-edit' });
    }

    function countryName(countryCode) {
      if (typeof countryCode === 'undefined' || countryCode === '') {
        return '';
      }
      return context.root.$i18n.t(`domain.countries.${countryCode}`);
    }

    getProfile();

    return {
      ...toRefs(data), getProfile, onPictureSaved, editProfile, countryName,
    };
  },
};
</script>

<style lang="scss" scoped>
.icon {
  width: 20px;
}
</style>
