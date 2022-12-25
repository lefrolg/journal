import { createStore } from "vuex";
import error from "@/store/modules/error";
import importEmployees from "@/store/modules/import";
import userChoice from "@/store/modules/userChoice";

export default createStore({
  modules: { error, importEmployees, userChoice },
});
