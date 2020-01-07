<template>
  <app-page>
    <template v-slot:main>
      <full-centered v-slot:main v-if="loading || oops">
        <loading-checkmark visible="false" :loading="loading" v-if="!oops"></loading-checkmark>
        <oops v-show="oops"></oops>
      </full-centered>

      <full-centered v-slot:main v-if="saving || saved">
        <loading-checkmark :visible="saving || saved" :loading="saving" :showCheckmark="saved">
          <template v-slot:messages>
            <div v-if="saving && !saved">
              {{ $t('common.please_wait') }}
            </div>
          </template>
        </loading-checkmark>
      </full-centered>

      <back-box :to="{ name: 'profile' }" v-show="!saving && !saved && !loading && !oops">
        <div class="row">
          <div class="col-md-3">
            <h4 class="mb-4">{{ $t('profile.modify_profile') }}</h4>
          </div>

          <div class="col-md-9">
            <validation-box id="_" :validationErrors="validationErrors"></validation-box>
            <form @submit.prevent="save" v-show="!saving">
              <div class="form-row">
                <div class="form-group col-md-12">
                  <input-text v-model="profile.firstname" id="firstname"
                  :label="$t('domain.user.first_name')"
                  :placeholder="$t('domain.user.your_first_name')"
                  icon="person"
                  :validationErrors="validationErrors"></input-text>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-12">
                  <input-text v-model="profile.lastname" id="lastname"
                  :label="$t('domain.user.last_name')"
                  :placeholder="$t('domain.user.your_last_name')"
                  icon="person"
                  :validationErrors="validationErrors"></input-text>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-12">
                  <input-text v-model="profile.email" id="email"
                  :label="$t('domain.user.email_address')"
                  :placeholder="$t('domain.user.your_email_address')"
                  icon="mail"
                  :validationErrors="validationErrors"></input-text>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-12">
                  <input-select v-model="profile.countryCode"
                  :options="countries()" id="countryCode"
                  :label="$t('domain.user.country')"
                  :placeholder="$t('domain.user.your_country')"
                  icon="location"
                  :validationErrors="validationErrors"></input-select>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-12">
                  <input-select v-model="profile.role" :options="roles()" id="role"
                  :label="$t('domain.user.role')" :placeholder="$t('domain.user.your_role')"
                  icon="person"
                  :validationErrors="validationErrors"></input-select>
                </div>
              </div>


              <div class="form-row">
                <div class="form-group col-md-4">
                  <input type="submit" id="submit" :value="$t('common.save')"
                    class="btn btn-primary btn-lg btn-block font-weight-bold"/>
                </div>
              </div>
            </form>

          </div>
        </div>
      </back-box>

    </template>
    <router-view/>
  </app-page>
</template>

<script>
import AppPage from 'seed-theme/src/layouts/AppPage.vue';
import { reactive, toRefs } from '@vue/composition-api';

export default {
  name: 'Profile',
  components: {
    AppPage,
  },
  setup(props, context) {
    const data = reactive({
      loading: false,
      oops: false,
      saving: false,
      saved: false,
      profile: {},
      validationErrors: [],
    });

    async function getProfile() {
      try {
        data.loading = true;
        data.oops = false;
        data.validationErrors = [];
        const response = await context.root.axios.get('/profile/me');
        data.profile = response.data;
        data.loading = false;
      } catch (error) {
        data.loading = false;
        data.oops = true;
      }
    }

    async function save() {
      try {
        data.validationErrors = [];
        data.saving = true;
        data.saved = false;
        await context.root.axios.post('/profile/me/update', {
          profile: data.profile,
        });
        data.saving = false;
        data.saved = true;
        const currentUser = context.root.$store.getters.user;
        currentUser.email = data.profile.email;
        context.root.$store.dispatch('setUser', { user: currentUser });
        context.root.$router.push({ name: 'profile' });
      } catch (error) {
        data.saving = false;
        if (error.response.status === 422) {
          this.validationErrors = this.normalizeErrors(error.response);
        } else {
          this.oops = true;
        }
      }
    }

    function roles() {
      const roleList = [];
      const { allRoles } = context.root.$store.getters;
      for (let i = 0; i < allRoles.length; i += 1) {
        roleList.push({
          value: allRoles[i],
          text: context.root.$i18n.t(`domain.roles.${allRoles[i]}`),
        });
      }
      return roleList;
    }

    function countries() {
      const countryList = [];
      const { allCountries } = context.root.$store.getters;
      for (let i = 0; i < allCountries.length; i += 1) {
        countryList.push({
          value: allCountries[i],
          text: context.root.$i18n.t(`domain.countries.${allCountries[i]}`),
        });
      }
      return countryList;
    }

    getProfile();

    return {
      ...toRefs(data), getProfile, save, roles, countries,
    };
  },
};
</script>

<style lang="scss" scoped>
.icon {
  width: 20px;
}
</style>
