import apiClient from "./apiClient";

/**
 * Created by Alexander Golovnya on 2019-06-17.
 */
export const levelApi = {
  index() {
    return apiClient.get(`/api/hr-portal/v2/levels`).then((response) => {
      return response.data.data;
    });
  },
};
