import { LocalStorage } from "quasar";

export default {
  SET_LOADING(state, isLoading) {
    state.loading = isLoading;
  },
  SET_LOGGED_IN(state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn;
  },
  SET_USER(state, user) {
    if (!user) {
      state.user = null;
      return;
    }

    state.user = {
      id: user.id,
      cpf: user.cpf,
      email: user.email,
      name: user.nome,
      levelName: user.nivel,
      studentId: user.studentId,
      classId: user.classId,
      range: user.range,
    };
  },
  SET_LEVEL(state, level) {
    state.user.levelName = level;
  },
  SET_TOKEN(state, token) {
    if (token) {
      LocalStorage.set("avag-token", token);
    } else {
      LocalStorage.remove("avag-token");
    }

    state.token = token;
  },
  SET_REWARDS(state, rewards) {
    state.rewards = {
      coins: rewards.coins,
      points: rewards.points,
    };
  },
};
