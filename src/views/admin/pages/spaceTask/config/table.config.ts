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
    label: "名称",
    slotName: "name",
  },
  {
    prop: "introduce",
    label: "详情",
    slotName: "introduce",
  },
  {
    prop: "codeCount",
    label: "收集代码量",
    width: "150",
    slotName: "codeCount",
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
