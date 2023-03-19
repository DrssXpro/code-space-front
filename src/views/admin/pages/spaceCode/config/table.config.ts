import type { ITableConifg } from "@/components/FsTable/type";

const tableConfig: ITableConifg[] = [
  {
    prop: "id",
    label: "编号",
    width: "120",
    slotName: "id",
  },
  {
    prop: "title",
    label: "名称",
    slotName: "title",
  },
  {
    prop: "preview",
    label: "代码内容",
    slotName: "preview",
  },
  {
    prop: "lan",
    label: "代码语言",
    slotName: "lan",
  },
  {
    prop: "user.authorName",
    label: "作者",
    slotName: "authorName",
  },
  {
    prop: "task.taskName",
    label: "所属任务",
    slotName: "taskName",
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
    width: "140",
    slotName: "operator",
  },
];

export default tableConfig;
