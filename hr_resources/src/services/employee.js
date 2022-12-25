import apiClient from "./apiClient";
import { objectToQuery } from "@/utils/objectToQuery";

export default {
  delete(company_id, id) {
    return apiClient
      .delete(
        `/api/hr-portal/v2/companies/${company_id}/subscriptions/one/${id}`
      )
      .then((response) => {
        return response.data;
      });
  },
  store(company_id, employee) {
    return apiClient
      .post(
        `/api/hr-portal/v2/companies/${company_id}/subscriptions/one`,
        employee
      )
      .then((response) => {
        if (response?.type == "error") {
          return { message: response.message, errors: response.errors };
        } else {
          return response.data;
        }
      });
  },
  update(company_id, employee) {
    return apiClient
      .put(
        `/api/hr-portal/v2/companies/${company_id}/subscriptions/one/${employee.id}`,
        employee
      )
      .then((response) => {
        if (response?.type == "error") {
          return { message: response.message, errors: response.errors };
        } else {
          return response.data;
        }
      });
  },
  one(company_id, id) {
    return apiClient
      .get(`/api/hr-portal/v2/companies/${company_id}/subscriptions/one/${id}`)
      .then((response) => {
        return response.data.data;
      });
  },
  index(company_id, month, params = {}) {
    if (!company_id || company_id == 0) return [];
    return apiClient
      .get(
        `/api/hr-portal/v2/companies/${company_id}/month/${month}/subscriptions/json/${objectToQuery(
          params
        )}`
      )
      .then((response) => {
        return response.data.data;
      });
  },
  mass_upsert(company_id, month, employees, params = {}) {
    return apiClient
      .put(
        `/api/hr-portal/v2/companies/${company_id}/month/${month}/subscriptions/json${objectToQuery(
          params
        )}`,
        {
          data: employees,
        }
      )
      .then((response) => {
        return response;
      });
  },
  download(company_id, month, params = {}) {
    return apiClient
      .get(
        `/api/hr-portal/v2/companies/${company_id}/month/${month}/subscriptions/tabular${objectToQuery(
          params
        )}`,
        {
          responseType: "blob",
        }
      )
      .then((response) => {
        const file = new Blob([response.data], { type: response.type });
        const contentDisposition = response.headers["content-disposition"];
        file.name = contentDisposition.match(/=([^"]+)/)[1];
        return file;
      });
  },
  template(company_id) {
    return apiClient
      .get(`/api/hr-portal/v2/companies/${company_id}/template`, {
        responseType: "blob",
      })
      .then((response) => {
        const file = new Blob([response.data], { type: response.type });
        const contentDisposition = response.headers["content-disposition"];
        file.name = contentDisposition.match(/=([^"]+)/)[1];
        return file;
      });
  },
  getDateImportPermission(company_id) {
    if (!company_id) return;
    return apiClient
      .get(`/api/hr-portal/v2/companies/${company_id}/permissions`)
      .then((response) => {
        return response.data;
      });
  },
  /**
   *
   * @param company_id
   * @param params
   * @param tabularFile
   * @returns {Promise<Blob>}
   */
  parse(company_id, month, tabularFile, params = {}) {
    const formData = new FormData();
    formData.append("tabular_file", tabularFile);
    return apiClient.post(
      `/api/hr-portal/v2/companies/${company_id}/month/${month}/subscriptions/tabular${objectToQuery(
        params
      )}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  },
};
