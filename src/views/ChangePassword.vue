<template>
  <app-layout>
    <loading-circle loading="loading" v-show="loading"></loading-circle>
    <oops v-show="oops"></oops>

    <div class="row" v-show="!loading && !oops">
      <div class="col-sm">
        <div class="card box">
          <div class="card-body">

            <div class="saving text-center mt-5 mb-5" v-show="saving || saved">
              <div v-bind:class="[{ 'load-complete mt-4 mb-4': saved },
              'circle-loader circle-text']">
                <div class="checkmark draw" v-show="saved"></div>
              </div>
              <div v-if="saving && !saved">
                {{ $t('common.please_wait') }}
              </div>
              <div v-if="saved">
                {{ $t('profile.password_updated') }}
              </div>
            </div>

            <div class="row row-form" v-show="!saving && !saved">
              <div class="col-md-3">
                <h4>{{ $t('app.password') }}</h4>
              </div>

              <div class="col-md-9">

                <validation-box id="_" :validationErrors="validationErrors"></validation-box>

                <form @submit.prevent="save" v-show="!saving">

                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <input-password v-model="currentPassword" id="password"
                      :label="$t('profile.current_password')"
                      :placeholder="$t('profile.current_password_placeholder')"
                      icon="outline-lock-24px@2x.svg"
                      :validationErrors="validationErrors"></input-password>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <input-password v-model="newPassword" id="newPassword"
                      :label="$t('profile.new_password')"
                      :placeholder="$t('profile.new_password_placeholder')"
                      icon="outline-lock-24px@2x.svg"
                      :validationErrors="validationErrors"></input-password>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <input-password v-model="repeatNewPassword" id="repeatNewPassword"
                      :label="$t('profile.repeat_new_password')"
                      :placeholder="$t('profile.repeat_new_password_placeholder')"
                      icon="outline-lock-24px@2x.svg"
                      :validationErrors="validationErrors"></input-password>
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
import AppLayout from 'seed-theme/src/layouts/AppLayout.vue';

export default {
  name: 'ChangePassword',
  components: {
    AppLayout,
  },
  data() {
    return {
      loading: false,
      oops: false,
      saving: false,
      saved: false,

      currentPassword: '',
      newPassword: '',
      repeatNewPassword: '',

      validationErrors: [],
    };
  },
  methods: {
    save() {
      this.validationErrors = [];
      this.saving = true;
      this.saved = false;
      this.axios.post('/api/profile/change-password', {
        password: this.currentPassword,
        newPassword: this.newPassword,
        repeatNewPassword: this.repeatNewPassword,
      })
        .then(() => {
          this.saving = false;
          this.saved = true;
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
};
</script>
