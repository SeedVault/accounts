<template>
  <div id="exampleChecks" role="group" tabindex="-1">
    <div class="custom-control custom-checkbox custom-control-inline">
      <input
        :id="id"
        v-model="inputValue"
        type="checkbox"
        class="custom-control-input"
        true-value="1"
        false-value="0"
      />
      <label class="custom-control-label" :for="id"> {{label}}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id', 'value', 'label'],
  data() {
    return { inputValue: this.value };
  },
  watch: {
    inputValue(val) {
      this.$emit('input', val);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
