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
            const { avatar, ...userProfile } = userData.user;

            commit("SET_USER", {
              ...userProfile,
              nivel: userData.profile.nivel,
            });

            commit("SET_REWARDS", {
              coins: userData.profile.moedas,
              points: userData.profile.pontos,
            });

            commit("SET_TOKEN", access_token);

            dispatch("avatar/setAvatar", avatar);

            dispatch(
              "AchievementsModule/setAchievements",
              {
                achievements: userData.conquistas,
                obtainedList: userData.conquistas_user,
              },
              {
                root: true,
              }
            );

            resolve(true);
          }
        )
        .catch((err) => {
          console.error(err);
          resolve(false);
        })
        .finally(() => {
          dispatch("setLoading", false);
        });
    });
  },
  setRewards: ({ commit }, { coins, points, level }) => {
    if (coins || points) {
      commit("SET_REWARDS", {
        coins,
        points,
      });
    }

    if (level) {
      commit("SET_LEVEL", level);
    }
  },
  getUserByToken: ({ commit, dispatch }, token) => {
    return new Promise((resolve, reject) => {
      api
        .get("auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data: { data: userData } }) => {
          const { avatar, ...userProfile } = userData.user;

          commit("SET_USER", {
            ...userProfile,
            nivel: userData.profile.nivel,
          });

          commit("SET_REWARDS", {
            coins: userData.profile.moedas,
            points: userData.profile.pontos,
          });

          dispatch("avatar/setAvatar", avatar);

          dispatch(
            "AchievementsModule/setAchievements",
            {
              achievements: userData.conquistas,
              obtainedList: userData.conquistas_user,
            },
            {
              root: true,
            }
          );

          dispatch("ActivitiesModule/setProfileActivities", userData.trilhas, {
            root: true,
          });

          resolve();
        })
        .catch((err) => {
          console.error(err);
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
