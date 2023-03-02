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
  {
    type: "upload",
    label: "头像",
    field: "c",
    labelWidth: "100",
  },
  {
    type: "tree",
    label: "菜单",
    field: "b",
    labelWidth: "100",
    treeOptions: [
      {
        id: 1,
        label: "Level one 1",
        children: [
          {
            id: 4,
            label: "Level two 1-1",
            children: [
              {
                id: 9,
                label: "Level three 1-1-1",
              },
              {
                id: 10,
                label: "Level three 1-1-2",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        label: "Level one 2",
        children: [
          {
            id: 5,
            label: "Level two 2-1",
          },
          {
            id: 6,
            label: "Level two 2-2",
          },
        ],
      },
      {
        id: 3,
        label: "Level one 3",
        children: [
          {
            id: 7,
            label: "Level two 3-1",
          },
          {
            id: 8,
            label: "Level two 3-2",
          },
        ],
      },
    ],
    defaultCheckKey: [5],
    defaultExpandedKey: [2, 3],
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

export  { modalConfig, modalValid };
