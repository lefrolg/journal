<template>
  <modal-window ref="modal">
    <template #header> {{ title }} </template>
    <template #body>
      <div class="modal__line">
        <input type="text" :placeholder="$t('Input.name')" v-model="employee.name" />
        <p class="error" v-if="errors?.name">
          <template v-for="error of errors.name">{{ error }}</template>
          <br />
        </p>
      </div>
      <div class="modal__line">
        <input type="tel" :placeholder="$t('Input.phone')" v-model="employee.phone" />
        <p class="error" v-if="errors?.phone">
          <template v-for="error of errors.phone">{{ error }}</template> <br />
        </p>
      </div>
      <div class="modal__line">
        <select v-model="employee.level">
          <option :value="''" disabled selected hidden>{{ $t("Input.CardType") }}</option>
          <template v-for="item in levels" :key="item.id + item.name">
            <option :value="item.id">
              {{ item.name }}
            </option>
          </template>
        </select>
        <p class="error" v-if="errors?.level">
          <template v-for="error of errors.level">{{ error }}</template> <br />
        </p>
      </div>
      <p class="error" v-if="message">{{ message }}</p>
    </template>
    <template #actions="{ close }">
      <button @click="close" type="button" class="btn btn--secondary">{{ $t("Button.Cancel") }}</button>
      <button @click="sendData" type="button" class="btn btn--primary" :disabled="!isValid">
        {{ $t("Button.Save") }}
      </button>
    </template>
  </modal-window>
</template>

<script>
import ModalWindow from "@/components/ModalWindow";

export default {
  name: "EditEmployee",
  components: {
    ModalWindow,
  },
  props: {
    levels: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      errors: {},
      message: "",
      processing: false,
      employee: { name: "", phone: "", level: "" },
      title: "",
      mode: "add",

      allowedPhoneFormats: [
        {
          country: "375",
          city: ["25", "29", "33", "44"],
          number: 12,
        },
      ],
    };
  },
  computed: {
    isValid() {
      for (let field in this.employee) {
        if (!this.employee[field]) return false;
      }
      return this.isPhoneValid && this.nameSymbolsValidation();
    },
    isPhoneValid() {
      if (!this.employee.phone) return false;
      if (!this.phoneSymbolsValidation()) return false;
      const countryValidation = this.phoneCountryValidation();
      if (!countryValidation || !this.phoneCityValidation(countryValidation)) return false;
      return this.employee.phone.length === countryValidation.number;
    },
  },
  watch: {
    "employee.phone": function () {
      this.errors.phone = "";
      if (!this.employee.phone) return;
      if (!this.phoneSymbolsValidation()) {
        this.errors.phone = this.$t("Error.phoneSymbol");
        return;
      }
      if (this.employee.phone.length < 3) return;
      const countryValidation = this.phoneCountryValidation();
      if (!countryValidation) {
        this.errors.phone = this.$t("Error.phoneCountry");
        return;
      }
      if (this.employee.phone.length < 5) return;
      if (!this.phoneCityValidation(countryValidation)) {
        this.errors.phone += this.$t("Error.phoneCity");
      }
      if (this.employee.phone.length > countryValidation.number) {
        this.errors.phone += this.$t("Error.phoneNumber1") + countryValidation.number + this.$t("Error.phoneNumber2");
      }
    },
    "employee.name": function () {
      this.errors.name = "";
      if (!this.employee.name) return;
      if (!this.nameSymbolsValidation()) {
        this.errors.name = this.$t("Error.nameSymbol");
      }
    },
  },
  methods: {
    async open({ employee = false, sendEmployee }) {
      this.clean();

      if (employee) {
        this.employee = {
          id: employee.id,
          name: employee.name,
          phone: employee.phone.toString(),
          level: employee.level,
        };
        this.title = this.$t("EditEmployee.titleEdit");
        this.mode = "edit";
      } else {
        this.title = this.$t("EditEmployee.titleAdd");
      }

      this.sendEmployee = sendEmployee;

      const result = await this.$refs.modal.open();
      if (result) {
        return this.employee;
      } else {
        return false;
      }
    },
    async sendData() {
      this.processing = true;
      const result = await this.sendEmployee(this.employee);
      this.processing = false;
      if (result.message) {
        this.errors = result.errors;
      } else {
        this.employee = result;
        this.$refs.modal.confirm();
      }
    },
    clean() {
      this.processing = false;
      this.mode = "add";
      this.errors = {};
      this.message = "";
      this.employee = { name: "", phone: "", level: "" };
    },

    phoneCountryValidation() {
      const phone = this.employee.phone;
      if (!phone || phone.length < 3) return false;
      const country = phone.slice(0, 3);
      return this.allowedPhoneFormats.find((v) => v.country == country);
    },
    phoneCityValidation(countryValidation) {
      if (!countryValidation) return false;
      const phone = this.employee.phone;
      if (!phone || phone.length < 5) return false;
      return countryValidation.city.find(
        (city) => phone.slice(countryValidation.country.length, countryValidation.country.length + city.length) == city
      );
    },
    phoneSymbolsValidation() {
      const reg = /^\d+$/;
      return this.employee.phone.match(reg);
    },
    nameSymbolsValidation() {
      const reg = /[`0-9!@#$%^&*()_+\-=[\]{};:"\\|,.<>/?~]/;
      return !reg.test(this.employee.name);
    },
  },
};
</script>
