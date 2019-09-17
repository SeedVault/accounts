<template>
  <app-layout>
    <loading-circle loading="loading" v-show="loading"></loading-circle>
    <oops v-show="oops"></oops>

    <div class="row" v-show="!loading && !oops">
      <div class="col-sm">
        <div class="card box">
          <div class="card-body">
            <h4 class="card-title mb-4">{{ $t('app.profile') }}</h4>


            <div class="row row-form view">
              <div class="col-md-3">
                <picture-changer ref="pictureChanger" @picture-saved="onPictureSaved"></picture-changer>
              </div>

              <div class="col-md-7">
                <h1 class="view__title">{{ firstname }} {{ lastname }}</h1>
                <p>by <strong>{{ username }}</strong></p>
                </div>
                <div class="col-md-2">
                  <button type="submit" class="btn btn-sm btn-primary btn-block mb-2" @click="editComponent()">{{ $t('common.modify') }}</button>
                </div>
              </div>

          </div>
        </div>
      </div>
    </div>
  </app-layout>
</template>

<script>
import AppLayout from 'seed-theme/src/layouts/AppLayout.vue';
import PictureChanger from 'seed-theme/src/components/PictureChanger.vue';
export default {
  name: 'ProfileView',
  components: {
    AppLayout,
    PictureChanger,
  },
  data() {
    return {
      loading: false,
      oops: false,

      username: '',
      email: '',
      firstname: '',
      lastname: '',
      countryCode: '',
      role: '',
      picture: '',
      pictureUrl: '',
      accountStatus: '',
      createdAt: '',
      updateAt: '',
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      this.axios.get(`/api/profile`)
        .then((result) => {
          this.loading = false;
          this.username = result.data.username;
          this.email = result.data.email;
          this.firstname = result.data.firstname;
          this.lastname = result.data.lastname;
          this.countryCode = result.data.countryCode;
          this.role = result.data.role;
          this.picture = result.data.picture;
          this.pictureUrl = result.data.pictureUrl;
          this.accountStatus = result.data.accountStatus;
          this.createdAt = result.data.createdAt;
          this.updatedAt = result.data.updatedAt;
          this.$refs.pictureChanger.loadImage(
            this.pictureUrl,
            `${this.$store.getters.user.id}.jpg`,
            `/api/profile/change-picture`,
          );
        })
        .catch((error) => {
          this.loading = false;
          this.oops = true;
        });
    },
    onPictureSaved(newPictureUrl) {
      let currentUser = this.$store.getters.user;
      currentUser.picture = newPictureUrl;
      this.$store.dispatch('setUser', { user: currentUser });
    },
  },
};
</script>

<style lang="scss" scoped>

.view {

  color: #686b77;
  font-size: 16px;

  &__image {
    width: 100%;
    border-radius: 1rem !important;
  }

  &__title {
    font-size: 1.5rem;
    color: #212529;
  }

  &__subtitle {
    margin-top: 2rem;
    font-size: 1.2rem;
    color: #212529;
  }

  &__updatedAt {
    margin-left: 20px;
  }
}

</style>
