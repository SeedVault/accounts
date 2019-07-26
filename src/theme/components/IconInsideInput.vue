<template>
  <div class="input-icon-wrapper">
    <img :src="require('@/assets/icons/' + icon)" class="icon" />
  </div>
</template>

<script>
export default {
  props: ['icon'],
};
</script>
