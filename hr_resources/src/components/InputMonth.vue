<template>
  <div class="action--date">
    <label>
      {{ $t("Input.Period") }}
      <input type="month" v-model="month" :disabled="disabled" />
    </label>
  </div>
</template>
<script>
import { dateToYYYY_MM } from "@/utils/month";

export default {
  name: "inputMonth",
  props: {
    date: {
      type: Object || String,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    month: {
      get() {
        return dateToYYYY_MM(this.date);
      },
      set(newValue) {
        this.$emit("changeDate", new Date(newValue));
      },
    },
  },
};
</script>
