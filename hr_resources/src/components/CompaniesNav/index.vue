<template>
  <menu class="companies">
    <a ref="download"></a>
    <template v-for="(item, key) in companies" :key="key + item">
      <li :class="{ selected: item.id == companyId }">
        <router-link :to="{ name: 'companies', params: { companyId: item.id } }">
          <img src="@/assets/images/BusinessLogo.svg" alt="" />
          {{ item.name }}
        </router-link>
      </li>
      <template v-if="item.id == companyId">
        <li :class="{ selected: item.id == companyId }">
          <router-link :to="{ name: 'companies', params: { companyId: item.id } }">
            <img src="@/assets/images/BusinessLogo.svg" alt="" />
            {{ $t("CompaniesNav.employees") }}
          </router-link>
        </li>
        <li :class="{ 'selected-group': item.id == companyId }">
          <a href="#" @click="downloadInvoice">
            <img src="@/assets/images/purse.svg" alt="" />
            {{ $t("CompaniesNav.account") }}
          </a>
        </li>
        <li :class="{ 'selected-group': item.id == companyId }">
          <a href="#" @click="downloadAct">
            <img src="@/assets/images/purse.svg" alt="" />
            {{ $t("CompaniesNav.act") }}
          </a>
        </li>
      </template>
    </template>
  </menu>
</template>
<script>
import api from "@/services/company";
import openBlobOtherWindow from "@/utils/openBlobOtherWindow";
import { dateToYYMM } from "@/utils/month";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "CompaniesNav",
  data() {
    return {
      companies: [],
      errorMessage: "",
    };
  },
  props: {
    companyId: {
      type: String,
      required: false,
      default: "0",
    },
  },
  computed: mapGetters(["date"]),
  created() {
    this.setCompanies();
  },
  methods: {
    ...mapMutations(["setError"]),
    async setCompanies() {
      this.companies = await api.index();
      const currentCompany = this.companies.find((company) => company.id == this.companyId);
      if (!currentCompany || this.companyId == 0) {
        this.$router.push({ name: "companies", params: { companyId: this.companies[0].id } });
      }
    },
    async downloadInvoice(e) {
      e.preventDefault();
      const file = await api.invoice(this.companyId, dateToYYMM(this.date));
      if (file.type == "error") {
        this.setError(file);
      } else {
        openBlobOtherWindow(file, file.name, this.$refs.download);
      }
    },
    async downloadAct(e) {
      e.preventDefault();
      const file = await api.act(this.companyId, dateToYYMM(this.date));
      if (file.type == "error") {
        this.setError(file);
      } else {
        openBlobOtherWindow(file, file.name, this.$refs.download);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
