import type { IFormConfigItem } from "@/components/FsForm/type";

const formConfig: IFormConfigItem[] = [
  {
    label: "关键词查询",
    placeholder: "请输入角色名称",
    field: "name",
    type: "input",
  },
  {
    label: "角色状态",
    placeholder: "请选择角色状态",
    field: "status",
    type: "select",
    options: [
      {
        value: 1,
        text: "正常",
      },
      {
        value: 0,
        text: "停用",
      },
    ],
  },
];

export default formConfig;
