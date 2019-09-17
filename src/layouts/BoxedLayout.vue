<template>
  <div class="container">
    <div class="form-row">
      <div class="col-sm-4"></div>
      <div class="col-sm-4 main-container">
        <div class="text-center">
          <img class="logo" src="@/assets/images/accounts-logo.svg" />
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
