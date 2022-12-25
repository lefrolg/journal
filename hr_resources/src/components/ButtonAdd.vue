<template>
  <div>
    <button class="btn btn--primary" @click="$emit('add')" :disabled="disabled">
      <img src="@/assets/images/PlusLogo.svg" alt="" />
      {{ $t("Button.Add") }}
    </button>
  </div>
</template>
<script>
export default {
  name: "ButtonAdd",
  emits: ["add"],
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>
