import { store } from "quasar/wrappers";
import { createStore } from "vuex";

import AuthModule from "./modules/auth";
import FeedModule from "./modules/feed";
import RankingModule from "./modules/ranking";
import MissionsModule from "./modules/missions";
import ActivitiesModule from "./modules/activities";
import AchievementsModule from "./modules/achievements";
import CertificatesModule from "./modules/certificates";
import LibraryModule from "./modules/library";
import NotificationsModule from "./modules/notifications";

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      AuthModule,
      FeedModule,
      RankingModule,
      MissionsModule,
      ActivitiesModule,
      AchievementsModule,
      CertificatesModule,
      LibraryModule,
      NotificationsModule,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
});
