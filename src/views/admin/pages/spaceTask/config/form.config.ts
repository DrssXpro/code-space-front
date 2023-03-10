import type { IFormConfigItem } from "@/components/FsForm/type";

const formConfig: IFormConfigItem[] = [
  {
    label: "关键词查询",
    placeholder: "请输入任务名称",
    field: "kw",
    type: "input",
  },
  {
    label: "过期查询",
    placeholder: "查看任务是否过期",
    field: "isEx",
    type: "select",
    options: [
      {
        value: "1",
        text: "是",
      },
      {
        value: "2",
        text: "否",
      },
    ],
  },
];

export default formConfig;
