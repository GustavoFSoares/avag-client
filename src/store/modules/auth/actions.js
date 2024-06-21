import { api } from "boot/axios";
import { SessionStorage } from "quasar";

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

            const [startRange, endRange] = userData.profile.intervalo;

            commit("SET_USER", {
              ...userProfile,
              studentId: userProfile.aluno.id,
              classId: userProfile.aluno.turmas[0].id,
              nivel: userData.profile.nivel,
              range: {
                start: startRange,
                end: endRange,
              },
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

            dispatch("LibraryModule/buildLibrary", userData.turma.trilhas, {
              root: true,
            });

            dispatch("FeedModule/buildFeeds", userData.feeds, {
              root: true,
            });

            dispatch("MissionsModule/buildMissions", userData.missoes, {
              root: true,
            });

            resolve({ request: true, message: "" });
          }
        )
        .catch((err) => {
          resolve({ request: false, message: err.response?.data?.data[0] });
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

          const [startRange, endRange] = userData.profile.intervalo;
          commit("SET_USER", {
            ...userProfile,
            studentId: userData.user.aluno.id,
            classId: userData.turma.id,
            nivel: userData.profile.nivel,
            range: {
              start: startRange,
              end: endRange,
            },
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

          dispatch("LibraryModule/buildLibrary", userData.turma.trilhas, {
            root: true,
          });

          dispatch("FeedModule/buildFeeds", userData.feeds, {
            root: true,
          });

          dispatch("MissionsModule/buildMissions", userData.missoes, {
            root: true,
          });

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
  refreshUser: async ({ dispatch, getters }) => {
    const token = getters["AuthModule/userToken"];

    await dispatch("getUserByToken", token);
  },
  invalidateUser: ({ commit }) => {
    commit("SET_USER", null);
    commit("SET_TOKEN", null);
    SessionStorage.remove("presentation");
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
  updateUser: async ({ dispatch, getters }, userData) => {
    const { id: userId } = getters.userData;

    try {
      alert("Editar Usuário: ");
      // await api.put(`/user/${userId}`, userData);
    } catch (err) {
      console.log(err);
    }
  },
};
