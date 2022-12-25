<template>
  <div>
    <button class="btn btn--secondary" @click="downloadPreviousList">{{ $t("Button.Previous") }}</button>
    <a ref="download"></a>
  </div>
</template>
<script>
import employeeApi from "@/services/employee";
import { dateToYYMM } from "@/utils/month";
import openBlobOtherWindow from "@/utils/openBlobOtherWindow";

export default {
  name: "ButtonDownloadPrevious",
  props: {
    date: {
      type: Object || null || String,
      required: true,
    },
    companyId: {
      type: String,
      required: true,
    },
  },
  methods: {
    async downloadPreviousList() {
      let date = new Date(this.date);
      date.setMonth(date.getMonth() - 1);
      const file = await employeeApi.download(this.companyId, dateToYYMM(date));
      openBlobOtherWindow(file, file.name, this.$refs.download);
    },
  },
};
</script>
