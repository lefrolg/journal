<template>
  <portal-layout>
    <template #companies>
      <router-view name="sidebar" />
    </template>
    <template #account>
      <router-view name="user" />
    </template>
    <template #content>
      <router-view :key="$route.fullPath" />
    </template>
  </portal-layout>
  <modal-window ref="appError">
    <template #header>{{ $t("Error.error") }}</template>
    <template #body>{{ getErrorMessage }}</template>
  </modal-window>
</template>
<script>
import { getUserToken, isHrAuthenticated, userLogout } from "@/utils/auth";
import PortalLayout from "@/components/layouts/PortalLayout";
import { setAxiosAuthorizationToken } from "@/services/apiClient";
import ModalWindow from "@/components/ModalWindow";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "PortalApp",
  components: { ModalWindow, PortalLayout },
  watch: {
    async getErrorMessage() {
      if (this.getErrorMessage) {
        await this.$refs.appError.open();
        this.clearError();
      }
    },
    getErrorStatus() {
      if (this.getErrorStatus === 401) {
        userLogout();
        this.$router.push({ name: "login" });
      }
    },
  },
  created() {
    if (isHrAuthenticated()) {
      const token = getUserToken();
      setAxiosAuthorizationToken(token);
    }
  },
  computed: mapGetters(["getErrorMessage", "getErrorStatus"]),
  methods: mapMutations(["clearError"]),
};
</script>
<style lang="css" src="./assets/styles/normalize.css"></style>
<style lang="scss" src="./assets/styles/common.scss"></style>
