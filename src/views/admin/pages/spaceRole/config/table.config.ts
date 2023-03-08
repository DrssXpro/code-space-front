import type { ITableConifg } from "@/components/FsTable/type";

const tableConfig: ITableConifg[] = [
  {
    prop: "id",
    label: "编号",
    width: "80",
    slotName: "id",
  },
  {
    prop: "name",
    label: "角色名",
    width: "150",
    slotName: "name",
  },
  {
    prop: "introduce",
    label: "简介",
    slotName: "introduce",
  },

  {
    prop: "roleChar",
    label: "角色标识",
    slotName: "roleChar",
  },
  {
    prop: "status",
    label: "状态",
    slotName: "status",
    width: "80",
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
    width: "150",
  },
];

export default tableConfig;
