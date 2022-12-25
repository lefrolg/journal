<template>
  <form @submit.prevent="requestToken">
    <fieldset>
      <legend>{{ $t("Input.SignIn") }}</legend>
      <div class="form-line">
        <input id="phone" type="tel" name="phone" autocomplete="phone" required readonly v-model="data.phone" />
      </div>
      <div class="form-line">
        <input
          id="sms_code"
          type="text"
          name="sms_code"
          autocomplete="sms_code"
          :placeholder="$t('Input.SMS')"
          required
          autofocus
          v-model="data.sms_code"
        />
      </div>
      <div class="form-line" v-if="timeToResend > 0">
        <small>
          {{ $t("Login.ResendMessage", { n: timeToResend }) }}
        </small>
      </div>
      <div>
        <button class="btn btn--secondary" @click.prevent="resend" :disabled="timeToResend > 0">
          {{ $t("Button.Resend") }}
        </button>
        <button class="btn btn--primary" type="submit" :disabled="processing || !data.sms_code">
          {{ $t("Input.SignIn") }}
        </button>
      </div>
    </fieldset>
  </form>
</template>

<script>
import { reactive, ref } from "vue";
import api from "../services/login";
import { useRouter } from "vue-router";
import { setAuth } from "@/utils/auth";

export default {
  name: "RequestToken",
  props: {
    phone: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      timeToResend: 60,
      timer: null,
    };
  },
  setup(props) {
    const router = useRouter();
    const data = reactive({
      phone: props.phone,
      sms_code: "",
    });
    let processing = ref(false);

    const requestToken = () => {
      processing = true;
      api.requestToken(data).then((user) => {
        setAuth(user);
        router.push("/portal/employee/list/");
        processing = false;
      });
    };
    return {
      data,
      requestToken,
      processing,
    };
  },
  mounted() {
    this.startTimer();
  },
  unmounted() {
    this.stopTimer();
  },
  watch: {
    timeToResend() {
      if (this.timeToResend <= 0) {
        this.stopTimer();
      }
    },
  },
  methods: {
    startTimer() {
      this.timeToResend = 60;
      this.timer = setInterval(() => {
        this.timeToResend--;
      }, 1000);
    },
    stopTimer() {
      clearTimeout(this.timer);
    },
    resend() {
      this.processing = true;
      api.requestSms(this.data.phone).then(() => {
        this.startTimer();
        this.processing = false;
      });
    },
  },
};
</script>
