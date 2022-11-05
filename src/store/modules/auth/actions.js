import { api } from "boot/axios";

export default {
  setLoading: ({ commit }, isLoading) => {
    commit("SET_LOADING", isLoading);
  },
  doLogin: ({ commit, dispatch }, { email, password }) => {
    dispatch("setLoading", true);

    return new Promise((resolve) => {
      api
        .post("auth/login", {
          email,
          password,
        })
        .then(
          ({
            data: {
              data: { access_token, user: userData },
            },
          }) => {
            commit("SET_USER", userData.user);
            commit("SET_REWARDS", {
              coins: userData.profile.moedas,
              points: userData.profile.pontos,
            });

            commit("SET_TOKEN", access_token);

            resolve(true);
          }
        )
        .catch((err) => {
          resolve(false);
        })
        .finally(() => {
          dispatch("setLoading", false);
        });
    });
  },
  getUserByToken: ({ commit }, token) => {
    return new Promise((resolve, reject) => {
      api
        .get("auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data: { data: userData } }) => {
          commit("SET_USER", userData.user);
          commit("SET_REWARDS", {
            coins: userData.profile.moedas,
            points: userData.profile.pontos,
          });

          resolve();
        })
        .catch((err) => {
          reject();
        });
    });
  },
  invalidateUser: ({ commit }) => {
    commit("SET_USER", null);
    commit("SET_TOKEN", null);
  },
  doRestartPassword: async ({ dispatch }, { username }) => {
    dispatch("setLoading", true);

    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch("setLoading", false);
        resolve(true);
      }, 3000);
    });
  },
};
