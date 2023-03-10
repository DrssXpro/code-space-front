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
    prop: "extime",
    label: "是否过期",
    width: "100",
    slotName: "isEx",
  },
  {
    prop: "extime",
    label: "过期时间",
    slotName: "extime",
  },
  {
    prop: "createdAt",
    label: "创建时间",
    slotName: "createdAt",
  },
  {
    prop: "operator",
    label: "操作",
    slotName: "operator",
  },
];

export default tableConfig;
