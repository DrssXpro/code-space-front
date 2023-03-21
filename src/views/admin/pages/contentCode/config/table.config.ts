import type { ITableConifg } from "@/components/FsTable/type";

const tableConfig: ITableConifg[] = [
  {
    prop: "id",
    label: "编号",
    width: "100",
    slotName: "id",
  },
  {
    prop: "title",
    label: "代码名称",
    width: "100",
    slotName: "title",
  },
  {
    prop: "preview",
    label: "代码内容",
    slotName: "preview",
  },
  {
    prop: "lan",
    label: "编程语言",
    slotName: "lan",
  },
  {
    prop: "user.authorName",
    label: "作者",
    slotName: "authorName",
  },
  {
    prop: "status",
    label: "状态",
    width: "80",
    slotName: "status",
  },
  {
    prop: "isPwd",
    label: "是否加密",
    width: "120",
    slotName: "isPwd",
  },
  {
    prop: "createdAt",
    label: "创建时间",
    slotName: "createdAt",
  },
  {
    prop: "updatedAt",
    label: "更新时间",
    slotName: "updatedAt",
  },
  {
    prop: "operator",
    label: "操作",
    slotName: "operator",
  },
];

export default tableConfig;
