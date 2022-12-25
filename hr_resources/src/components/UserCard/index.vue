<template>
  <div class="user" v-if="user.name">
    <actions-list class="user__actions" :style="{ top: '25px', right: '-25px' }">
      <li @click="logout">
        <span>Logout</span>
        <img src="@/assets/images/IconLogout.svg" alt="" />
      </li>
    </actions-list>
    <div class="user__title">{{ user.name }}</div>
    <div class="user__position">{{ user.position }}</div>
  </div>
</template>
<script>
import { getUser, isHrAuthenticated, userLogout } from "@/utils/auth";
import login from "@/services/login";
import ActionsList from "@/components/ActionsList";

export default {
  name: "UserCard",
  components: { ActionsList },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    logout() {
      userLogout();
      this.isLogout = true;
      this.$router.push({ name: "login" });
    },
    async setUser() {
      this.user = getUser();
      if (!this.user.name && isHrAuthenticated()) {
        this.user = await login.getUserData();
      }
    },
  },
  created() {
    this.setUser();
  },
};
</script>
<style lang="scss" scoped>
@import "index.scss";
</style>
