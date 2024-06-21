import { api } from "boot/axios";
import { defaultAvatar } from "avag-avatar-creator"

export default {
  setAvatar: ({ commit }, avatarOptions) => {
    let avatarData
    if (typeof avatarOptions === "string") {
      avatarData = JSON.parse(avatarOptions);
    } else {
      avatarData = { ...avatarOptions }
    }

    if (Object.values(avatarData).length === 0) {
      avatarData = { ...defaultAvatar }
    }
    commit("SET_AVATAR_OPTIONS", avatarData);
  },
  sendAvatar: async ({ commit, rootGetters }, avatarOptions) => {
    const { id: userId } = rootGetters["AuthModule/userData"];

    try {
      commit("SET_LOADING", true);

      await api.put(`/user/${userId}`, {
        avatar: { ...avatarOptions },
      });

      commit("SET_AVATAR_OPTIONS", { ...avatarOptions });
    } catch (err) {
      console.error("Error trying update avatar", err);
    } finally {
      setTimeout(() => {
        commit("SET_LOADING", false);
      }, 1500);
    }
  },
};
