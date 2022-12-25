import VueI18n from "@/i18n";

/*
This method is like wrapper for error returned by  axios request,
 */
export function appHandlerError(error) {
  // Quasar Toast Schema
  const errorResponse = {
    isValidationError: false,
    message: "Network Error.",
    type: "error",
    errors: [],
    status: 0,
  };
  const ErrorMessages = {
    400: VueI18n.global.tm("Error.400"),
    401: VueI18n.global.tm("Error.401"),
    403: VueI18n.global.tm("Error.403"),
    404: VueI18n.global.tm("Error.404"),
    405: VueI18n.global.tm("Error.405"),
    500: VueI18n.global.tm("Error.500"),
    request: VueI18n.global.tm("Error.request"),
    other: VueI18n.global.tm("Error.other"),
  };
  if (error && error.response) {
    errorResponse.status = error.response.status || 0;
    // client received an error response (5xx, 4xx)
    if (error.response.status === 400) {
      // console.log('unauthorized, logging out ...');
      errorResponse.isValidationError = true;
      errorResponse.message = error.response.data.message;
    } else if (error.response.status === 401) {
      // console.log('unauthorized, logging out ...');
      errorResponse.message = ErrorMessages["401"];
    } else if (error.response.status === 403) {
      errorResponse.isValidationError = true;
      errorResponse.message = ErrorMessages["403"];
    } else if (error.response.status === 404) {
      errorResponse.isValidationError = true;
      errorResponse.message = ErrorMessages["404"];
    } else if (error.response.status === 422) {
      errorResponse.isValidationError = true;
      if (error.response.data) {
        errorResponse.data = error.response.data;
      }
      errorResponse.errors = error.response.data.errors;
      errorResponse.message = error.response.data.message;
    } else if (error.response.status === 405) {
      errorResponse.isValidationError = true;
      errorResponse.message = ErrorMessages["405"];
    } else if (error.response.status >= 500) {
      errorResponse.message = ErrorMessages["500"];
    } else if (error.response.status === 429) {
      //
    }
  } else if (error && error.request) {
    errorResponse.message = ErrorMessages.request;
    // client never received a response, or request never left
  } else if (error instanceof Error) {
    errorResponse.message = error.message;
  } else if (typeof error === "string") {
    errorResponse.message = error;
  } else {
    errorResponse.message = ErrorMessages.other;
  }
  return errorResponse;
}
