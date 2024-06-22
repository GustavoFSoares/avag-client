import { api } from "boot/axios";

export default {
  setLoading: ({ commit }, isLoading) => {
    commit("SET_LOADING", isLoading);
  },
  loadNotifications: async ({ commit, rootGetters }) => {
    try {
      commit("SET_LOADING", true);

      const { data } = await api.post("/alunos/notificacao-user");

      commit("SET_NOTIFICATIONS", data);

      return data;
    } catch (err) {
      console.error("Courses Data Error", err);
    } finally {
      commit("SET_LOADING", false);
    }
  },
}
