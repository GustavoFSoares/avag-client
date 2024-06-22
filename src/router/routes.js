import AuthRoutes from "modules/Auth/routes";
import HomeRoutes from "modules/Home/routes";
import UserRoutes from "modules/User/routes/index.routes";
import ActivitiesRoutes from "modules/Activities/routes/index.routes";
import NotificationsRoutes from "modules/Notifications/routes";

const routes = [
  ...AuthRoutes,
  {
    path: "",
    name: "",
    redirect: { name: "home" },
    component: () => import("layouts/MainLayout.vue"),
    children: [...HomeRoutes, ...UserRoutes, ...NotificationsRoutes, ...ActivitiesRoutes],
  },
  {
    name: "test",
    path: "/test",
    component: () => import("pages/Test.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
