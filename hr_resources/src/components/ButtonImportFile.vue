<template>
  <div>
    <button class="btn btn--secondary" @click="importFileProcess" :disabled="disabled">
      {{ $t("Button.Import") }}
    </button>
    <import-file ref="import" :companyId="companyId" :date="date" />
  </div>
</template>
<script>
import ImportFile from "@/components/ImportFile";
export default {
  name: "ButtonImportFile",
  components: { ImportFile },
  props: {
    date: {
      required: true,
    },
    companyId: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ["import"],
  methods: {
    async importFileProcess() {
      const result = await this.$refs.import.open();
      if (result) {
        this.$emit("import", result);
      }
    },
  },
};
</script>
