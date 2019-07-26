<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>
    <input type="text" :id="id" v-model="inputValue" :placeholder="placeholder"
      :class="{'input-with-icon':true, 'form-control': true,
      'is-invalid':(validationErrors[id] !== undefined)}" />
    <icon-inside-input :icon="icon"></icon-inside-input>
    <validation-messages :id="id" :validationErrors="validationErrors"></validation-messages>
  </div>
</template>

<script>
export default {
  props: ['id', 'value', 'label', 'placeholder', 'type', 'icon', 'validationErrors'],
  data() {
    return {
      inputValue: this.value,
    };
  },
  watch: {
    inputValue(val) {
      this.$emit('input', val);
    },
  },
};
</script>
