import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "layout",
      redirect: "/square",
      component: () => import("@/layout/index.vue"),
      children: [
        {
          path: "square",
          name: "square",
          component: () => import("@/views/square/index.vue"),
        },
        {
          path: "space",
          name: "space",
          component: () => import("@/views/space/index.vue"),
        },
        {
          path: "search",
          name: "search",
          component: () => import("@/views/search/index.vue"),
        },
        {
          path: "/share",
          name: "share",
          component: () => import("@/views/share/index.vue"),
        },
        {
          path: "admin",
          name: "admin",
          redirect: "/admin/user",
          component: () => import("@/views/admin/index.vue"),
          children: [
            {
              path: "user",
              name: "user",
              component: () => import("@/views/admin/pages/user/index.vue"),
            },
            {
              path: "code",
              name: "code",
              component: () => import("@/views/admin/pages/code/index.vue"),
            },
          ],
        },
        {
          path: "system",
          name: "system",
          component: () => import("@/views/system/index.vue"),
        },
      ],
    },
  ],
});

export default router;
