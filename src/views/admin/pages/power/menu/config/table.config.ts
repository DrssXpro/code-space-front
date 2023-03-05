import type { ITableConifg } from "@/components/FsTable/type";

const tableConfig: ITableConifg[] = [
  {
    prop: "id",
    label: "编号",
    width: "80",
    slotName: "id",
  },
  {
    prop: "name",
    label: "菜单名称",
    width: "100",
    slotName: "name",
  },
  {
    prop: "menuIcon",
    label: "菜单图标",
    slotName: "menuIcon",
    width: "100",
  },
  {
    prop: "orderNum",
    label: "排序",
    slotName: "orderNum",
    width: "80",
  },
  {
    prop: "routePath",
    label: "路由路径",
    slotName: "routePath",
  },
  {
    prop: "comPath",
    label: "组件路径",
    slotName: "comPath",
  },
  {
    prop: "perms",
    label: "权限标识",
    slotName: "perms",
  },
  {
    prop: "status",
    label: "状态",
    slotName: "status",
  },
  {
    prop: "createdAt",
    label: "创建时间",
    slotName: "createdAt",
    width: "200",
  },
  {
    prop: "operator",
    label: "操作",
    slotName: "operator",
  },
];

export default tableConfig;
