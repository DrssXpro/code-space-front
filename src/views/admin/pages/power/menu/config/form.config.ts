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
        value: "1",
        text: "cpp",
      },
      {
        value: "2",
        text: "java",
      },
      {
        value: "3",
        text: "JavaScript",
      },
    ],
  },
  {
    label: "空间查询",
    placeholder: "请选择编程语言",
    field: "test",
    type: "remoteSelect",
    options: [],
  },
];

export default formConfig;
