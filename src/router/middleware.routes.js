export default async ([to, from, next], $store) => {
  const userIsLoggedIn = $store.getters["AuthModule/userIsLoggedIn"];
  const userData = $store.getters["AuthModule/userData"];

  if (!/auth/.test(to.name) && !userIsLoggedIn) {
    next({ name: "auth.login" });
    return;
  }

  if (userIsLoggedIn && !userData) {
    const token = $store.getters["AuthModule/userToken"];

    try {
      await $store.dispatch("AuthModule/getUserByToken", token);
    } catch (err) {
      await $store.dispatch("AuthModule/invalidateUser");

      next({ name: "auth.login" });
      return;
    }
  }

  return next();
};
