<template>
  <app-layout>
    <loading-circle loading="loading" v-show="loading"></loading-circle>
    <oops v-show="oops"></oops>

    <div class="row" v-show="!loading && !oops">
      <div class="col-sm">
        <div class="card box">
          <div class="card-body">
            <h4 class="card-title mb-4">Report</h4>
            <p><strong>{{ data.length }}</strong> users</p>

            <div class="row row-form view">
              <table class="table table-sm">
                <thead>
                  <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Firstname</th>
                    <th scope="col">Lastname</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Referral Code</th>
                    <th scope="col">Created at</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user, index) in data" :key="index">
                    <td>{{ user.username }}</td>
                    <td>{{ user.firstname }}</td>
                    <td>{{ user.lastname }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.referralCode }}</td>
                    <td>{{ user.createdAt | toDate('short') }}</td>
                  </tr>
                </tbody>
              </table>
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
  name: 'ReferralCodesReport',
  components: {
    AppLayout,
  },
  data() {
    return {
      loading: false,
      oops: false,
      data: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      this.axios.get('/api/referral-codes/report')
        .then((result) => {
          this.loading = false;
          this.data = result.data;
        })
        .catch(() => {
          this.loading = false;
          this.oops = true;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
