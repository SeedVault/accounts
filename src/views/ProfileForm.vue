<template>
  <app-layout>
    <loading-circle loading="loading" v-show="loading"></loading-circle>
    <oops v-show="oops"></oops>

    <div class="row" v-show="!loading && !oops">
      <div class="col-sm">
        <div class="card box">
          <div class="card-body">

            <router-link class="nav-link back" :to="{ name: 'profile-view' }"
            v-show="!saving && !saved">
              <img :src="require('@/assets/icons/outline-icon-back-24px.svg')" />
              {{ $t('common.back') }}
            </router-link>

            <div class="saving text-center" v-show="saving || saved">
              <div v-bind:class="[{ 'load-complete': saved }, 'circle-loader circle-text']">
                <div class="checkmark draw" v-show="saved"></div>
              </div>
              <div v-if="saving && !saved">
                {{ $t('common.please_wait') }}
              </div>
            </div>

            <div class="row row-form" v-show="!saving && !saved">
              <div class="col-md-3">
                <h4>{{ $t('profile.modify_profile') }}</h4>
              </div>

              <div class="col-md-9">

                <validation-box id="_" :validationErrors="validationErrors"></validation-box>

                <form @submit.prevent="save" v-show="!saving">

                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <input-text v-model="firstname" id="firstname"
                      :label="$t('domain.user.first_name')"
                      :placeholder="$t('domain.user.your_first_name')"
                      icon="outline-person-24px@2x.svg"
                      :validationErrors="validationErrors"></input-text>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <input-text v-model="lastname" id="lastname"
                      :label="$t('domain.user.last_name')"
                      :placeholder="$t('domain.user.your_last_name')"
                      icon="outline-person-24px@2x.svg"
                      :validationErrors="validationErrors"></input-text>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <input-text v-model="email" id="email"
                      :label="$t('domain.user.email_address')"
                      :placeholder="$t('domain.user.your_email_address')"
                      icon="outline-mail-24px@2x.svg"
                      :validationErrors="validationErrors"></input-text>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <input-select v-model="countryCode" :options="countries" id="countryCode"
                      :label="$t('domain.user.country')"
                      :placeholder="$t('domain.user.your_country')"
                      icon="outline-location_on-24px@2x.svg"
                      :validationErrors="validationErrors"></input-select>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <input-select v-model="role" :options="roles" id="role"
                      :label="$t('domain.user.role')" :placeholder="$t('domain.user.your_role')"
                      icon="outline-person-24px@2x.svg"
                      :validationErrors="validationErrors"></input-select>
                    </div>
                  </div>


                  <div class="form-row">
                    <div class="form-group col-md-4 button-area">
                      <input type="submit" id="submit" :value="$t('common.save')"
                        class="btn btn-primary btn-lg btn-block"/>
                    </div>
                  </div>

                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </app-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import AppLayout from 'seed-theme/src/layouts/AppLayout.vue';

export default {
  name: 'ProfileForm',
  components: {
    AppLayout,
  },
  data() {
    return {
      loading: false,
      oops: false,
      saving: false,
      saved: false,

      email: '',
      firstname: '',
      lastname: '',
      fullname: '',
      countryCode: '',
      role: '',

      validationErrors: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      this.axios.get('/api/profile')
        .then((result) => {
          this.loading = false;
          this.firstname = result.data.firstname;
          this.lastname = result.data.lastname;
          this.email = result.data.email;
          this.fullname = result.data.fullname;
          this.countryCode = result.data.countryCode;
          this.role = result.data.role;
        })
        .catch(() => {
          this.loading = false;
          this.oops = true;
        });
    },
    save() {
      this.validationErrors = [];
      this.saving = true;
      this.saved = false;
      this.axios.post('/api/profile', {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        countryCode: this.countryCode,
        role: this.role,
      })
        .then(() => {
          this.saving = false;
          this.saved = true;
          const currentUser = this.$store.getters.user;
          currentUser.email = this.email;
          this.$store.dispatch('setUser', { user: currentUser });
          this.$router.push({ name: 'profile-view' });
        })
        .catch((error) => {
          this.saving = false;
          if (error.response.status === 422) {
            this.validationErrors = this.normalizeErrors(error.response);
          } else {
            this.oops = true;
          }
        });
    },
  },
  computed: {
    ...mapGetters(['allCountries', 'allRoles']),
    roles() {
      const roleList = [];
      for (let i = 0; i < this.allRoles.length; i += 1) {
        roleList.push({
          value: this.allRoles[i],
          text: this.$i18n.t(`domain.roles.${this.allRoles[i]}`),
        });
      }
      return roleList;
    },
    countries() {
      const countryList = [];
      for (let i = 0; i < this.allCountries.length; i += 1) {
        countryList.push({
          value: this.allCountries[i],
          text: this.$i18n.t(`domain.countries.${this.allCountries[i]}`),
        });
      }
      return countryList;
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
    margin-bottom: 3rem;
    font-weight: 500;
    font-size: 1.2rem;
  }

  &__icon {
    margin-right: 10px;
  }
}

</style>
