import type { ITableConifg } from "@/components/FsTable/type";

const tableConfig: ITableConifg[] = [
  {
    prop: "id",
    label: "编号",
    slotName: "id",
  },
  {
    prop: "name",
    label: "用户名",
    width: "100",
    slotName: "name",
  },
  {
    prop: "avatar",
    label: "头像",
    slotName: "avatar",
    width: "100",
  },
  {
    prop: "email",
    label: "邮箱",
    slotName: "email",
    width: "170",
  },
  {
    prop: "roleName",
    label: "角色",
    slotName: "roleName",
  },
  {
    prop: "spaceName",
    label: "所属空间",
    slotName: "spaceName",
  },
  {
    prop: "status",
    label: "状态",
    slotName: "status",
    width: "70",
  },
  {
    prop: "createdAt",
    label: "创建时间",
    slotName: "createdAt",
  },
  {
    prop: "updatedAt",
    label: "修改时间",
    slotName: "updatedAt",
  },
  {
    prop: "operator",
    label: "操作",
    slotName: "operator",
  },
];

export default tableConfig;
