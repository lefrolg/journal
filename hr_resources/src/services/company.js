import apiClient from "./apiClient";
import { objectToQuery } from "@/utils/objectToQuery";

export default {
  index() {
    return apiClient.get(`/api/hr-portal/v2/companies`).then((response) => {
      return response.data.data;
    });
  },
  act(company_id, month, params = {}) {
    return apiClient
      .get(
        `/api/hr-portal/v2/companies/${company_id}/month/${month}/acts/last${objectToQuery(
          params
        )}`,
        {
          responseType: "blob",
        }
      )
      .then((response) => {
        if (response.type == "error") {
          return response;
        }
        const file = new Blob([response.data], { type: response.type });
        const contentDisposition = response.headers["content-disposition"];
        file.name = contentDisposition.match(/="(.*)"/)[1];
        return file;
      });
  },
  invoice(company_id, month, params = {}) {
    return apiClient
      .get(
        `/api/hr-portal/v2/companies/${company_id}/month/${month}/invoices/last${objectToQuery(
          params
        )}`,
        {
          responseType: "blob",
        }
      )
      .then((response) => {
        if (response.type === "error") {
          return response;
        }
        const file = new Blob([response.data], { type: response.type });
        const contentDisposition = response.headers["content-disposition"];
        file.name = contentDisposition.match(/="(.*)"/)[1];
        return file;
      });
  },
};
