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
          redirect: "/space/list",
          component: () => import("@/views/space/index.vue"),
          children: [
            {
              path: "list",
              name: "spaceList",
              component: () => import("@/views/space/pages/spaceList/index.vue"),
            },
            {
              path: "detail/:id",
              name: "spaceDetail",
              component: () => import("@/views/space/pages/spaceDetail/index.vue"),
            },
          ],
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
          path: "/login",
          name: "login",
          component: () => import("@/views/login/index.vue"),
        },
        {
          path: "/code/:id",
          name: "code",
          component: () => import("@/views/code/index.vue"),
        },
        {
          path: "admin",
          name: "admin",
          redirect: "/admin/personal",
          component: () => import("@/views/admin/index.vue"),
          children: [
            {
              path: "personal",
              name: "adminPersonal",
              component: () => import("@/views/admin/pages/personal/index.vue"),
            },
            {
              path: "code",
              name: "adminCode",
              component: () => import("@/views/admin/pages/code/index.vue"),
            },
            {
              path: "content/user",
              name: "adminContentUser",
              component: () => import("@/views/admin/pages/content/user/index.vue"),
            },
          ],
        },
      ],
    },
  ],
});

export default router;
