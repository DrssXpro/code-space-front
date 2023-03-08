import type { ITableConifg } from "@/components/FsTable/type";

const tableConfig: ITableConifg[] = [
  {
    prop: "test1",
    label: "编号",
    width: "100",
    slotName: "test1",
  },
  {
    prop: "test2",
    label: "用户名",
    width: "100",
    slotName: "test2",
  },
  {
    prop: "test3",
    label: "头像",
    slotName: "test3",
  },
  {
    prop: "createdAt",
    label: "邮箱",
    slotName: "createdAt",
  },
  {
    prop: "updatedAt",
    label: "身份",
    slotName: "updatedAt",
  },
  {
    prop: "updatedAt",
    label: "所属空间",
    slotName: "updatedAt",
  },
  {
    prop: "updatedAt",
    label: "创建时间",
    slotName: "updatedAt",
  },
  {
    prop: "operator",
    label: "操作",
    slotName: "operator",
  },
];

export default tableConfig;
