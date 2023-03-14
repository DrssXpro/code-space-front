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
    label: "空间名",
    width: "100",
    slotName: "name",
  },
  {
    prop: "introduce",
    label: "空间介绍",
    slotName: "introduce",
  },
  {
    prop: "user.authorName",
    label: "空间主",
    slotName: "user.authorName",
  },
  {
    prop: "createdAt",
    label: "创建时间",
    slotName: "createdAt",
  },
  {
    prop: "updatedAt",
    label: "创建时间",
    slotName: "updatedAt",
  },
  {
    prop: "operator",
    label: "操作",
    width: "70",
    slotName: "operator",
  },
];

export default tableConfig;
