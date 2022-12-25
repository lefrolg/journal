// initial state
const state = {
  error: {},
};

// getters
const getters = {
  getErrorResponse(state) {
    return state.error;
  },
  getErrorMessage(state) {
    let message = state.error.message ?? "";

    if (state.error?.errors && state.error.errors.length) {
      const addErrors = Object.values(state.error.errors).flat().join(", ");
      message += addErrors;
    }
    return message;
  },
  getErrorStatus(state) {
    return state.error.status || 0;
  },
};

// actions
const actions = {};

// mutations
const mutations = {
  setError(state, error) {
    state.error = error;
  },
  clearError(state) {
    state.error = {};
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
