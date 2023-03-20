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
    width: "200",
    slotName: "introduce",
  },
  {
    prop: "user.authorName",
    label: "空间主",
    slotName: "user.authorName",
  },
  {
    prop: "peopleCount",
    label: "空间人数",
    width: "90",
    slotName: "peopleCount",
  },
  {
    prop: "codeCount",
    label: "空间代码量",
    width: "110",
    slotName: "codeCount",
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
