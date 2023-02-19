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
          path: "personal",
          name: "personal",
          component: () => import("@/views/personal/index.vue"),
        },
        {
          path: "admin",
          name: "admin",
          component: () => import("@/views/admin/index.vue"),
        },
      ],
    },
  ],
});

export default router;
