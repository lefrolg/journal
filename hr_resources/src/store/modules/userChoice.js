export default {
  mutations: {
    setDate(state, date) {
      state.date = date;
    },
  },
  state: {
    date: "",
  },
  getters: {
    date(state) {
      return state.date;
    },
  },
};
