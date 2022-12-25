<template>
  <div v-if="isOpen" class="modal" @mousedown.self="close">
    <div class="modal__content">
      <div class="modal__header">
        <slot name="header"></slot>
        <div class="modal__close" @click="close">&times;</div>
      </div>
      <div class="modal__body">
        <slot name="body"></slot>
      </div>

      <div class="modal__actions">
        <slot name="actions" :close="close" :confirm="confirm">
          <button @click="close" type="button" class="btn btn--secondary">{{ $t("Button.Close") }}</button>
          <button @click="confirm" type="button" class="btn btn--primary">{{ $t("Button.Ok") }}</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalWindow",
  data() {
    return {
      isOpen: false,
      popupController: null,
    };
  },
  emits: ["close", "confirm"],
  methods: {
    open() {
      let resolve;
      let reject;
      const popupPromise = new Promise((ok, fail) => {
        resolve = ok;
        reject = fail;
      });
      this.popupController = { resolve, reject };
      this.isOpen = true;

      return popupPromise;
    },

    confirm() {
      this.popupController.resolve(true);
      this.isOpen = false;
    },

    close() {
      this.popupController.resolve(false);
      this.isOpen = false;
    },
  },
};
</script>
