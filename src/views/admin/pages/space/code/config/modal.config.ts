import type IModalConfigItem from "@/components/FsModal/type";
import type { FormRules } from "element-plus";

const modalConfig: IModalConfigItem[] = [
  {
    label: "关键词查询",
    placeholder: "请输入菜单标题",
    field: "title",
    type: "input",
    labelWidth: "100",
  },
  {
    label: "关键词查询",
    placeholder: "请选择编程语言",
    field: "lan",
    type: "select",
    labelWidth: "100",
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
    type: "switch",
    label: "状态",
    field: "a",
    labelWidth: "100",
  },
];

const modalValid: FormRules = {
  title: [
    { required: true, message: "标题不能为空", trigger: "blur" },
    { min: 3, max: 20, message: "输入内容过长或过短", trigger: "blur" },
  ],
  lan: [
    {
      required: true,
      message: "请先选择一门语言",
      trigger: "change",
    },
  ],
  a: [
    {
      required: true,
      message: "请设置状态",
      trigger: "change",
    },
  ],
};

export { modalConfig, modalValid };
