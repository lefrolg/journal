import { appHandlerError } from "@/utils/appHandlerError";
import store from "../store";

export function AxiosInterceptorOnFullFilled(response) {
  return response;
}

export function AxiosInterceptorOnRejected(error) {
  const handledError = appHandlerError(error); // if you want to customize the error message, you can send it as second parameter
  if (handledError.isValidationError) {
    return handledError;
  } else {
    store.commit("setError", handledError);
  }
}
