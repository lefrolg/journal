<template>
  <form @submit.prevent="requestSms">
    <fieldset>
      <legend>{{ $t("Input.SignIn") }}</legend>
      <div class="form-line">
        <input
          id="phone"
          :placeholder="$t('Input.phone')"
          type="tel"
          name="phone"
          autocomplete="phone"
          required
          autofocus
          v-model="data.phone"
        />
      </div>
      <div>
        <button class="btn btn--primary" type="submit" :disabled="processing || !data.phone">
          {{ $t("Button.Continue") }}
        </button>
      </div>
    </fieldset>
  </form>
</template>

<script>
import { reactive, ref } from "vue";
import api from "../services/login";
export default {
  name: "RequestSms",
  emits: ["sendRequestSms"],
  setup(props, context) {
    const data = reactive({
      phone: "",
    });
    let processing = ref(false);
    const requestSms = () => {
      processing = true;
      api.requestSms(data.phone).then(() => {
        context.emit("sendRequestSms", data.phone);
        processing = false;
      });
    };
    return {
      data,
      requestSms,
      processing,
    };
  },
};
</script>
