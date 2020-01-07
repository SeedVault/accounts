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
            <div v-if="saved">
              {{ $t('profile.password_updated') }}
            </div>
          </template>
        </loading-checkmark>
      </full-centered>

      <simple-box title="" v-show="!saving && !saved && !loading && !oops">
        <div class="row">
          <div class="col-md-3">
            <h4 class="mb-4">{{ $t('app.password') }}</h4>
          </div>

          <div class="col-md-9">
            <validation-box id="_" :validationErrors="validationErrors"></validation-box>
            <form @submit.prevent="save" v-show="!saving">
              <div class="form-row">
                <div class="form-group col-md-12">
                  <input-password v-model="currentPassword" id="password"
                  :label="$t('profile.current_password')"
                  :placeholder="$t('profile.current_password_placeholder')"
                  icon="lock"
                  :validationErrors="validationErrors"></input-password>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-12">
                  <input-password v-model="newPassword" id="newPassword"
                  :label="$t('profile.new_password')"
                  :placeholder="$t('profile.new_password_placeholder')"
                  icon="lock"
                  :validationErrors="validationErrors"></input-password>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-12">
                  <input-password v-model="repeatNewPassword" id="repeatNewPassword"
                  :label="$t('profile.repeat_new_password')"
                  :placeholder="$t('profile.repeat_new_password_placeholder')"
                  icon="lock"
                  :validationErrors="validationErrors"></input-password>
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
      </simple-box>

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
      currentPassword: '',
      newPassword: '',
      repeatNewPassword: '',
      validationErrors: [],
    });

    async function save() {
      try {
        data.validationErrors = [];
        data.saving = true;
        data.saved = false;
        await context.root.axios.post('/profile/me/change-password', {
          password: data.currentPassword,
          newPassword: data.newPassword,
          repeatNewPassword: data.repeatNewPassword,
        });
        data.saving = false;
        data.saved = true;
      } catch (error) {
        data.saving = false;
        if (error.response.status === 422) {
          this.validationErrors = this.normalizeErrors(error.response);
        } else {
          this.oops = true;
        }
      }
    }

    return {
      ...toRefs(data), save,
    };
  },
};


</script>
