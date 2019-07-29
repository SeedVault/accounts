<template>
  <div class="container-fluid">
    <div class="form-row">
      <div class="col-sm-4"></div>
      <div class="col-sm-4">
        <div class="text-center">
          <img class="logo" src="@/assets/images/accounts-logo.png" />
          <h2>Confirm logout</h2>
          <p>
            Do you really want to log out?
          </p>
        </div>

        <form @submit.prevent="submit">
          <div class="row">
            <div class="col-6">
              <input type="button" @click="logout(false)" id="no" name="no" value="No" class="btn btn-secondary btn-lg btn-block" />
            </div>
            <div class="col-6">
              <input type="button" @click="logout(true)" id="yes" name="yes" value="Yes" class="btn btn-primary btn-lg btn-block" />
            </div>
          </div>
        </form>
      </div>
      <div class="col-sm-4"></div>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    logout(confirmation) {
      var that = this;
      this.axios.post('/server/logout', {
        logout: confirmation
      })
      .then(function (response) {
        window.location.href = response.data.redirect;
      })
      .catch(function (error) {
        alert(error.response.status);
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.logo {
  text-align: center;
  margin-top: 37px;
  margin-bottom: 60px;
}

h2 {
  font-size: 48px;
  color: #323743;
  font-weight: 700;
  margin-bottom: 20px;
}

p.tos {
  font-size: 80%;
  font-weight: 400;
  color: #777;
  margin: 30px;
}

.scopeBox {
  border: 1px solid #ccc;
  padding: 20px 40px;
  border-radius: 5px;
  margin-top: 30px;
}
</style>
