import { boot } from "quasar/wrappers";

import VueAvatarCreator from "avag-avatar-creator";

export default boot(({ app }) => {
  app.use(VueAvatarCreator);
});
