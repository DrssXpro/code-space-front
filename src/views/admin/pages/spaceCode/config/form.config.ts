import type { IFormConfigItem } from "@/components/FsForm/type";

const formConfig: IFormConfigItem[] = [
  {
    label: "关键词查询",
    placeholder: "请输入菜单标题",
    field: "title",
    type: "input",
  },
  {
    label: "关键词查询",
    placeholder: "请选择编程语言",
    field: "lan",
    type: "select",
    options: [
      {
        value: "cpp",
        text: "cpp",
      },
      {
        value: "Java",
        text: "Java",
      },
      {
        value: "JavaScript",
        text: "JavaScript",
      },
      {
        value: "Python",
        text: "Python",
      },
      {
        value: "PHP",
        text: "PHP",
      },
      {
        value: "CSS",
        text: "CSS",
      },
      {
        value: "Vue",
        text: "Vue",
      },
    ],
  },
];

export default formConfig;
