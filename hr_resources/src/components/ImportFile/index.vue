<template>
  <modal-window ref="modal">
    <template #header> {{ $t("Import.title") }} </template>
    <template #body>
      <div>
        <div class="file-head">
          <div>
            <label for="importFile"> {{ $t("Import.label") }} </label>
            <span class="link" @click="downloadTemplate">{{ $t("Import.template") }} </span><a ref="download"></a>
          </div>
          <input-month :date="date" :disabled="true" />
        </div>
        <hr />
        <div class="file-area">
          <p class="file-name" v-if="file?.name">
            <img src="@/assets/images/file-earmark.svg" alt="" />
            {{ file.name }}
          </p>
          <p class="file-name" v-if="!file?.name">
            <a href="#">{{ $t("Import.instructionsPart1") }}</a> {{ $t("Import.instructionsPart2") }}
          </p>
          <input id="importFile" type="file" @input="chooseFile" />
        </div>
        <p class="error" v-if="errors.file">{{ errors.file }}</p>
      </div>
    </template>

    <template #actions="{ close }">
      <button class="btn btn--secondary" @click="close" type="button" :disabled="processing">
        {{ $t("Button.Cancel") }}
      </button>
      <button class="btn btn--primary" @click="send" type="button" :disabled="processing || !file">
        {{ $t("Button.Load") }}
      </button>
    </template>
  </modal-window>
</template>

<script>
import ModalWindow from "@/components/ModalWindow";
import apiEmployee from "@/services/employee";
import { dateToYYMM } from "@/utils/month";
import { mapMutations } from "vuex";
import openBlobOtherWindow from "@/utils/openBlobOtherWindow";
import InputMonth from "@/components/InputMonth";

export default {
  name: "ImportFile",
  components: {
    ModalWindow,
    InputMonth,
  },
  data() {
    return {
      processing: false,
      file: null,
      errors: {},
      fileStatus: 0,
    };
  },
  props: {
    companyId: {
      type: String,
      required: true,
    },
    date: {
      required: true,
    },
  },
  methods: {
    ...mapMutations(["setImportEmployees"]),
    async open() {
      this.fileStatus = 0;
      await this.$refs.modal.open();
      return this.fileStatus;
    },
    chooseFile(event) {
      this.file = event.target.files[0];
    },
    async send() {
      this.processing = true;
      const result = await apiEmployee.parse(this.companyId, dateToYYMM(this.date), this.file);
      if (result && result.type === "error") {
        this.setImportEmployees({
          fileName: this.file.name,
          employees: result.data.data,
          companyId: this.companyId,
          date: this.date,
          messages: result.data.messages,
        });
        this.fileStatus = -1;
      } else if (result.status && result.status === 204) {
        this.fileStatus = 1;
      }
      this.$refs.modal.confirm();

      this.processing = false;
      this.file = null;
      this.errors = {};
    },
    async downloadTemplate() {
      const file = await apiEmployee.template(this.companyId);
      openBlobOtherWindow(file, file.name, this.$refs.download);
    },
  },
};
</script>
<style src="./index.scss" lang="scss" scoped></style>
