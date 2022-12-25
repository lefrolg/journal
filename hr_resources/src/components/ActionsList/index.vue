<template>
  <div class="actions" ref="actions">
    <img src="@/assets/images/more_vert.svg" alt="" class="actions__open" @click="open" />
    <ul class="actions__list" @click="close" v-if="isOpen" :style="style">
      <slot></slot>
    </ul>
  </div>
</template>
<script>
export default {
  name: "ActionsList",
  props: {
    style: {
      type: Object,
      required: false,
      default: () => {
        return {
          top: "30px",
          right: "0",
        };
      },
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    open() {
      this.isOpen = !this.isOpen;
    },
    close() {
      this.isOpen = false;
    },
    blur(e) {
      if (!this.$refs.actions.contains(e.target) && this.isOpen) {
        this.close();
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.blur);
  },
  unmounted() {
    document.removeEventListener("click", this.blur);
  },
};
</script>
<style lang="scss">
@import "index";
</style>
