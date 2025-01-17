import state from "./state";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import avatarSubmodule from "./avatar";

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
  modules: {
    avatar: avatarSubmodule,
  },
};
