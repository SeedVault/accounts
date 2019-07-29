<template>
  <div v-model="validationErrors[id]"  v-if="validationErrors[id] !== undefined">
    <div class="alert alert-danger" role="alert">
      <ul>
        <!-- eslint-disable-next-line vue/require-v-for-key -->
        <li v-for="err in validationErrors[id]">
          {{ err.msg }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id', 'validationErrors']
};
</script>
