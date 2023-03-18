import type { ITableConifg } from "@/components/FsTable/type";

const tableConfig: ITableConifg[] = [
  {
    prop: "id",
    label: "编号",

    slotName: "id",
  },
  {
    prop: "title",
    label: "名称",

    slotName: "title",
  },
  {
    prop: "content",
    label: "内容",
    slotName: "content",
  },
  {
    prop: "lan",
    label: "语言",
    slotName: "lan",
    width: "120",
  },
  {
    prop: "status",
    label: "状态",
    width: "100",
    slotName: "status",
  },
  {
    prop: "isPwd",
    label: "是否加密",
    width: "90",
    slotName: "isPwd",
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
