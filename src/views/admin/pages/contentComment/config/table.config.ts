import type { ITableConifg } from "@/components/FsTable/type";

const tableConfig: ITableConifg[] = [
  {
    prop: "id",
    label: "编号",
    width: "100",
    slotName: "id",
  },
  {
    prop: "content",
    label: "内容",
    slotName: "content",
  },
  {
    prop: "code.codeTitle",
    label: "评论来源",
    slotName: "codeTitle",
  },
  {
    prop: "user.authorName",
    label: "作者",
    slotName: "authorName",
  },
  {
    prop: "rootId",
    label: "类别",
    width: "100",
    slotName: "rootId",
  },
  {
    prop: "createdAt",
    label: "创建时间",
    slotName: "createdAt",
  },

  {
    prop: "operator",
    label: "操作",
    width: "70",
    slotName: "operator",
  },
];

export default tableConfig;
