import apiClient from "@/services/apiClient";

export default {
  requestSms(phone) {
    return apiClient
      .post("/api/hr-portal/v2/token-requests", {
        phone,
      })
      .then((response) => {
        return response.data.data;
      });
  },
  requestToken({ phone, sms_code }) {
    return apiClient
      .post("/api/hr-portal/v2/tokens", {
        phone,
        sms_code,
      })
      .then((response) => {
        return response.data.data;
      });
  },
  getUserData() {
    return apiClient.get("/api/hr-portal/v2/user").then((response) => {
      return response.data.data;
    });
  },
};
