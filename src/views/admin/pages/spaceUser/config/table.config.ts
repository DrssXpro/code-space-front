import type { ITableConifg } from "@/components/FsTable/type";

const tableConfig: ITableConifg[] = [
  {
    prop: "id",
    label: "编号",
    width: "100",
    slotName: "id",
  },
  {
    prop: "name",
    label: "用户名",
    slotName: "name",
  },
  {
    prop: "nickName",
    label: "空间昵称",
    slotName: "nickName",
  },
  {
    prop: "avatar",
    label: "头像",
    width: "100",
    slotName: "avatar",
  },
  {
    prop: "email",
    label: "邮箱",
    slotName: "email",
  },
  {
    prop: "role.roleName",
    label: "身份",
    width: "100",
    slotName: "roleName",
  },
  {
    prop: "createdAt",
    label: "创建时间",
    width: "190",
    slotName: "createdAt",
  },
  {
    prop: "updatedAt",
    label: "修改时间",
    width: "190",
    slotName: "updatedAt",
  },
  {
    prop: "operator",
    label: "操作",
    width: "120",
    slotName: "operator",
  },
];

export default tableConfig;
