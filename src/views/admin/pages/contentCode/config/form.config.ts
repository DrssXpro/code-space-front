import type { IFormConfigItem } from "@/components/FsForm/type";

const formConfig: IFormConfigItem[] = [
  {
    label: "关键词查询",
    placeholder: "请输入代码标题",
    field: "kw",
    type: "input",
  },
  {
    label: "编程语言查询",
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
