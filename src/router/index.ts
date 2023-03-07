import useUserStore from "@/stores/userStore";
import { ElMessage } from "element-plus";
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
          // 拦截未登录用户进入admin
          beforeEnter: (to, form) => {
            const { userInfo } = useUserStore();

            if (!userInfo) {
              ElMessage.warning("请先进行登录");
              return "/login";
            } else {
              return true;
            }
          },
          children: [
            // {
            //   path: "personal",
            //   name: "adminPersonal",
            //   component: () => import("@/views/admin/pages/personal/index.vue"),
            // },
            // {
            //   path: "code",
            //   name: "adminCode",
            //   component: () => import("@/views/admin/pages/code/index.vue"),
            // },
            // {
            //   path: "content/user",
            //   name: "adminContentUser",
            //   component: () => import("@/views/admin/pages/content/user/index.vue"),
            // },
            // {
            //   path: "content/code",
            //   name: "adminContentCode",
            //   component: () => import("@/views/admin/pages/content/code/index.vue"),
            // },
            // {
            //   path: "content/comment",
            //   name: "adminContentComment",
            //   component: () => import("@/views/admin/pages/content/comment/index.vue"),
            // },
            // {
            //   path: "content/space",
            //   name: "adminContentSpace",
            //   component: () => import("@/views/admin/pages/content/space/index.vue"),
            // },
            // {
            //   path: "power/role",
            //   name: "adminPowerRole",
            //   component: () => import("@/views/admin/pages/power/role/index.vue"),
            // },
            // {
            //   path: "power/menu",
            //   name: "adminPowerMenu",
            //   component: () => import("@/views/admin/pages/power/menu/index.vue"),
            // },
            // {
            //   path: "space/code",
            //   name: "adminSpaceCode",
            //   component: () => import("@/views/admin/pages/space/code/index.vue"),
            // },
            // {
            //   path: "space/people",
            //   name: "adminSpacePeole",
            //   component: () => import("@/views/admin/pages/space/people/index.vue"),
            // },
          ],
        },
      ],
    },
  ],
});

export default router;
