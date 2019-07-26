<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>
    <select :id="id" v-model="inputValue" :options="options" :placeholder="placeholder"
      :class="{'input-with-icon':true, 'form-control': true,
      'is-invalid':(validationErrors[id] !== undefined)}"></select>
    <icon-inside-input :icon="icon"></icon-inside-input>
    <validation-messages :id="id" :validationErrors="validationErrors"></validation-messages>
  </div>
</template>

<script>
export default {
  props: ['id', 'value', 'label', 'placeholder', 'icon', 'options', 'validationErrors'],
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
