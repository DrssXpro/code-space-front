import type IModalConfigItem from "@/components/FsModal/type";
import type { FormRules } from "element-plus";

const modalConfig: IModalConfigItem[] = [
  {
    label: "用户名",
    placeholder: "请输入用户名",
    field: "userName",
    type: "input",
    labelWidth: "100",
  },
  {
    label: "邮箱",
    placeholder: "请输入邮箱",
    field: "email",
    type: "input",
    labelWidth: "100",
  },
  {
    type: "password",
    label: "密码",
    placeholder: "请输入密码",
    field: "password",
    labelWidth: "100",
  },
  {
    type: "select",
    label: "角色",
    placeholder: "请选择角色",
    field: "role",
    labelWidth: "100",
    options: [
      {
        value: "1",
        text: "C",
      },
      {
        value: "2",
        text: "C++",
      },
      {
        value: "3",
        text: "Java",
      },
      {
        value: "4",
        text: "JavaScript",
      },
      {
        value: "5",
        text: "Python",
      },
    ],
  },
];

const modalValid: FormRules = {
  userName: [
    { required: true, message: "标题不能为空", trigger: "blur" },
    { min: 3, max: 20, message: "输入内容过长或过短", trigger: "blur" },
  ],
  password: [
    { required: true, message: "标题不能为空", trigger: "blur" },
    { min: 3, max: 20, message: "输入内容过长或过短", trigger: "blur" },
  ],
  email: [
    { required: true, message: "标题不能为空", trigger: "blur" },
    { min: 3, max: 20, message: "输入内容过长或过短", trigger: "blur" },
  ],
  role: [
    {
      required: true,
      message: "请先选择一门语言",
      trigger: "change",
    },
  ],
};

export { modalConfig, modalValid };
