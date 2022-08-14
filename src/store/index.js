import { createStore } from "vuex";

export default createStore({
  state: {
    isLoading: false,
    isLoading2: false,
  },
  mutations: {
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    SET_LOADING2(state, isLoading2) {
      state.isLoading2 = isLoading2;
    },
  },
  actions: {
    setLoading({ commit }, isLoading) {
      commit("SET_LOADING", isLoading);
    },
    setLoading2({ commit }, isLoading2) {
      commit("SET_LOADING2", isLoading2);
    },
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },
    isLoading2(state) {
      return state.isLoading2;
    },
  },
  modules: {},
});
