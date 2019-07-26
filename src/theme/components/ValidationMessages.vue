<template>
  <!-- eslint-disable-next-line vue/valid-v-model -->
  <div class="invalid-feedback" v-model="validationErrors[id]"
    v-if="validationErrors[id] !== undefined">
    <ul>
      <!-- eslint-disable-next-line vue/require-v-for-key -->
      <li v-for="err in validationErrors[id]">
        {{ err.msg }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['id', 'validationErrors'],
};
</script>
