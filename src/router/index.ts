import useFrontCode from "@/hooks/useFrontCode";
import { judgeSpaceIn } from "@/service/api/spaceRequest";
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
          meta: {
            title: "广场",
          },
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
              meta: {
                title: "空间列表",
              },
            },
            {
              path: "detail/:id",
              name: "spaceDetail",
              component: () => import("@/views/space/pages/spaceDetail/index.vue"),
              // 拦截判断进入空间权限
              beforeEnter: async (to, from) => {
                const spaceId = to.params.id as string;
                try {
                  const res = await judgeSpaceIn(Number(spaceId));
                  if (res.code === 1000) {
                    return true;
                  } else {
                    ElMessage.warning(res.message);
                    return "/space/list";
                  }
                } catch (error) {
                  ElMessage.error("访问空间失败");
                  return "/space/list";
                }
              },
              meta: {
                title: "我的空间",
              },
            },
          ],
        },
        {
          path: "search",
          name: "search",
          component: () => import("@/views/search/index.vue"),
          meta: {
            title: "搜索",
          },
        },
        {
          path: "share",
          name: "share",
          component: () => import("@/views/share/index.vue"),
          meta: {
            title: "分享",
          },
        },
        {
          path: "login",
          name: "login",
          component: () => import("@/views/login/index.vue"),
          meta: {
            title: "登录",
          },
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
          meta: {
            title: "代码详情",
          },
        },
        {
          path: "encrypt/:id",
          name: "encryptCode",
          component: () => import("@/views/encryptCode/index.vue"),
          meta: {
            title: "代码详情",
          },
        },
        {
          path: "spaceCode/:id",
          name: "spaceCode",
          component: () => import("@/views/spaceCode/index.vue"),
          meta: {
            title: "代码详情",
          },
        },
        {
          path: "admin",
          name: "admin",
          component: () => import("@/views/admin/index.vue"),
        },
        // 404动态路由
        // {
        //   path: "/404",
        //   name: "notFound",
        //   component: () => import("@/views/404/index.vue"),
        //   meta: {
        //     title: "not Found",
        //   },
        // },
      ],
    },
  ],
});

const modules = import.meta.glob("../views/*/*.vue"); // vite动态路由添加踩坑
router.beforeEach((to, from) => {
  const token = localStorage.getItem("token");
  const userInfo = localStorage.getItem("userInfo");
  const whiteList = ["/login", "/square", "/search", "/space", "/share", "/code", "/encrypt"];
  const { addDynamicRoutes, mapRoutes } = useUserStore();
  if (token && userInfo) {
    // 已经有登录态则不能再访问login页面，强制访问跳转至个人页面
    if (to.path === "/login") {
      return mapRoutes.length ? mapRoutes[0].path : "/admin";
    } else if (!whiteList.filter((item) => to.path.indexOf(item) === 0).length) {
      if (!mapRoutes.length) {
        addDynamicRoutes()
          .then((res) => {
            // 404页面需要添加完动态路由后再进行添加，否则会直接跳转404不加载动态路由
            router.addRoute("layout", {
              path: "/:pathMatch(.*)*",
              name: "notFound",
              component: modules["../views/404/index.vue"],
              meta: {
                title: "not found",
              },
            });
            router.replace(to); // 踩坑(刷新页面路由丢失)，动态添加路由之后需要强行刷新
          })
          .catch((err) => {
            ElMessage.warning("获取权限失败");
            return "/login";
          });
      }
    } else if (whiteList.filter((item) => to.path.indexOf(item) === 0).length) {
      return true;
    } else {
      return "/404";
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

router.afterEach((to) => {
  document.title = `Code Space | ${(to.meta.title as string) || ""}`;
});

export default router;
