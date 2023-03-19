import useFrontCode from "@/hooks/useFrontCode";
import usePwdStore from "@/stores/usePwdStore";
import useUserStore from "@/stores/userStore";
import { ElMessage } from "element-plus";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
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
              beforeEnter: (to, from) => {
                const { userInfo } = useUserStore();
                if (userInfo && userInfo.space) {
                  return `/space/detail/${userInfo.space.spaceId}`;
                } else {
                  return true;
                }
              },
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
          path: "share",
          name: "share",
          component: () => import("@/views/share/index.vue"),
        },
        {
          path: "login",
          name: "login",
          component: () => import("@/views/login/index.vue"),
        },
        {
          path: "code/:id",
          name: "code",
          component: () => import("@/views/code/index.vue"),
          // 拦截判断是否加密
          beforeEnter: async (to, from) => {
            const codeId = to.params.id as string;
            const { judeIsEnctrypt } = useFrontCode();
            const { codePwd } = usePwdStore();
            try {
              // 判断是否需要密码
              await judeIsEnctrypt(codeId);
              return;
            } catch (error) {
              // 查看缓存是否已输入密码验证
              if (codePwd.includes(codeId)) {
                return;
              }
              // 需要输入密码
              ElMessage.warning("需要密码");
              return `/encrypt/${codeId}`;
            }
          },
        },
        {
          path: "encrypt/:id",
          name: "encryptCode",
          component: () => import("@/views/encryptCode/index.vue"),
        },
        {
          path: "admin",
          name: "admin",
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
        },
      ],
    },
  ],
});

router.beforeEach((to, from) => {
  const token = localStorage.getItem("token");
  const userInfo = localStorage.getItem("userInfo");
  const whiteList = ["/login", "/square", "/search", "/space", "/share", "/code", "/encrypt"];
  if (token && userInfo) {
    // 已经有登录态则不能再访问login页面，强制访问跳转至个人页面
    if (to.path === "/login") {
      return "/admin";
    } else if (!whiteList.filter((item) => to.path.indexOf(item) === 0).length) {
      const { addDynamicRoutes, mapRoutes } = useUserStore();
      !mapRoutes &&
        addDynamicRoutes()
          .then((res) => {
            router.replace(to); // 踩坑(刷新页面路由丢失)，动态添加路由之后需要强行刷新
          })
          .catch((err) => {
            ElMessage.warning("获取权限失败");
            return "/login";
          });
    } else {
      return true;
    }
  } else {
    // 没有token，判断访问路由是否在白名单内，是的话不需要登录，不在需要强制转到login
    if (whiteList.filter((item) => to.path.indexOf(item) === 0).length) {
      return true;
    } else {
      ElMessage.warning("请先进行登录");
      return "/login";
    }
  }
});

export default router;
