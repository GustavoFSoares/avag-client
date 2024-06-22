export default [
  {
    path: "/notifications",
    name: "notifications",
    redirect: { name: "notifications.list" },
    component: () => import("modules/Notifications/layouts/NotificationsLayout.vue"),
    children: [
      {
        path: "list",
        name: "notifications.list",
        component: () => import("modules/Notifications/pages/NotificationsPage.vue"),
      },
      {
        path: "chat",
        name: "notifications.chat",
        component: () => import("modules/Notifications/pages/ChatPage.vue"),
      }
    ],
  },
];
