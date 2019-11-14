<template>
  <div class="container">
    <div class="form-row">
      <div class="col-sm-4"></div>
      <div class="col-sm-4 main-container">
        <div class="text-center" style="width: 369px;">
          <div style="margin: 0 auto; width: 180px; text-align: center">
            <!-- <img class="logo" src="@/assets/images/accounts-logo.svg" /> -->
            <div class="media" style="margin-top: 40px;margin-bottom: 50px;height: 30px;">
              <img class="navbar-brand-img align-self-start mr-3" :src="logoImage"
              style="margin-left:5px;width:30px;height:30px" />
              <div class="media-body">
                <!-- <img class="" src="/images/logo_separator.png"
                style="floating:right;width: 1px; height:30px;margin-right: 5px;"/> -->
                <img class="" :src="logoText" :style="logoTextStyle" />
              </div>
            </div>
          </div>
        </div>
        <slot/>
        <footer>
          <div class="row">
            <div class="col col-sm-5">
              <locale-changer />
            </div>
            <div class="col col-sm-7 legal-links">
              <a class="legal" href="#">{{ $t('common.privacy') }}</a>
              <a class="legal" href="#">{{ $t('common.terms') }}</a>
            </div>
          </div>
        </footer>
      </div>
      <div class="col-sm-4"></div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    logoImage() {
      return this.$store.getters.logoImage;
    },
    logoText() {
      return this.$store.getters.logoText;
    },
    logoTextStyle() {
      return `padding-left:5px;height:30px;width:${this.$store.getters.logoTextWidth};`;
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  text-align: center;
  margin-top: 37px;
  margin-bottom: 60px;
}

.legal-links {
  text-align: right;
  @media (max-width: 576px) {
    // text-align: left;
  }
}

a.legal {
  font-size: 0.75rem;
  color: #495057;
  margin-right: 10px;
  &:last-child { margin-left: 20px; }
  line-height: 1.75rem;
  @media (max-width: 576px) {
    &:last-child {
      margin-left: 0;
      margin-right: 20px;
    }
  }
}
</style>
