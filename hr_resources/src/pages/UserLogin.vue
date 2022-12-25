<template>
  <div class="user-login">
    <request-sms v-if="!phone" @sendRequestSms="setPhone" />
    <request-token v-else :phone="phone" />
  </div>
</template>
<script>
import RequestSms from "@/components/RequestSms";
import requestToken from "@/components/RequestToken";
import { isHrAuthenticated } from "@/utils/auth";
export default {
  name: "UserLogin",
  components: { RequestSms, requestToken },
  data() {
    return {
      phone: "",
    };
  },
  methods: {
    setPhone(phone) {
      this.phone = phone;
    },
  },
  mounted() {
    if (isHrAuthenticated()) {
      this.$router.push("/portal/employee/list/");
    }
  },
};
</script>
