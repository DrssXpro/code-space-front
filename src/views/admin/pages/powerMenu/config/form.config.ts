import type { IFormConfigItem } from "@/components/FsForm/type";

const formConfig: IFormConfigItem[] = [
  {
    label: "关键词查询",
    placeholder: "请输入菜单标题",
    field: "kw",
    type: "input",
  },
  {
    label: "菜单类别",
    placeholder: "请选择菜单类别",
    field: "type",
    type: "select",
    options: [
      {
        value: "M",
        text: "二级目录",
      },
      {
        value: "D",
        text: "一级菜单",
      },
      {
        value: "B",
        text: "按钮权限",
      },
    ],
  },
];

export default formConfig;
