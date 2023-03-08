import type { IMenuItem } from "@/types/menuType";

// 观察dom是否进入视口，懒加载
export function domObserver(el: HTMLElement, cb: () => void) {
  const observer = new IntersectionObserver((entries) => {
    const isShow = entries.some((entry) => entry.intersectionRatio > 0);
    if (isShow) {
      observer.unobserve(el);
      cb();
    }
  });

  observer.observe(el);
}

// 图片预加载
export function imageIsLoading(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(src);
    img.onerror = reject;
  });
}

/**
 *
 * @param fn 执行方法
 * @param delay 延迟时间
 * @param immediate 是否立即执行
 */
export function __debounce(fn: Function, delay: number, immediate = false) {
  let timer: NodeJS.Timeout | null = null;
  let isImmediate = false;
  return function (this: unknown, ...args: any[]) {
    if (immediate && !isImmediate) {
      fn.apply(this, args);
      isImmediate = true;
      return;
    }
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
      isImmediate = false;
    }, delay);
  };
}

// 菜单树形结构化
interface ITreeItem {
  id: number;
  parentId: null | number;
  [key: string]: any;
}
export function handleMenuToTree(menuList: ITreeItem[]) {
  const treeList: ITreeItem[] = [],
    treeMap: any = {};
  menuList.forEach((item) => {
    if (!item.children) {
      item.children = [];
    }
    treeMap[item.id] = item;
  });

  menuList.forEach((item) => {
    if (item.parentId && treeMap[item.parentId]) {
      treeMap[item.parentId].children.push(item);
    } else {
      treeList.push(item);
    }
  });

  return treeList;
}

export interface IRouteItem {
  name: string;
  path: string;
  component: any;
  meta: {
    title: string;
  };
}

// 菜单列表动态路由注册
export function handleMenuMapRoutes(menuTree: IMenuItem[]): any {
  const modules = import.meta.glob("./../views/admin/pages/*/*.vue"); // vite动态路由添加踩坑
  return menuTree
    .filter((item) => item.menuType === "D")
    .map((item) => {
      const routeItem: IRouteItem = {
        name: item.name,
        path: item.routePath!,
        component: modules[`../views/admin/pages/${item.comPath!}`],
        // component: ()=>import(`@/views/admin/pages/${item.comPath!}`) // ❌该方案在vite不适用
        meta: {
          title: item.name,
        },
      };
      return routeItem;
    });
}
