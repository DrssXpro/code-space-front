import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import validator from "@/utils/validator";
import { reactive, ref, type Ref } from "vue";

const { spaceValidator } = validator;
export default function useSpace(formRef: Ref<FormInstance | undefined>) {
  const formState = reactive({
    // 空间名
    spacename: "",
    // 空间介绍
    spaceintroduce: "",

    // 邀请码
    inviteCode: "",

    // 是否使用默认头像
    isDefault: 1,
  });
  // 生成空间头像
  const imageUrl = ref("");

  // 表单校验
  const spaceRules: FormRules = {
    spacename: [{ validator: spaceValidator.spacename, trigger: "blur" }],
    spaceintroduce: [{ validator: spaceValidator.spaceintroduce, trigger: "blur" }],
    inviteCode: [{ validator: spaceValidator.inviteCode, trigger: "blur" }],
  };

  // 提交空间表单：设置空间信息
  async function submitToSpace() {
    if (!formRef.value) return;
    formRef.value.validate(async (valid) => {
      if (valid) {
        try {
          ElMessage.success("设置成功");
        } catch (err) {
          ElMessage.warning("设置失败");
        }
      } else {
        ElMessage.warning("输入内容不符合规范");
      }
    });
  }

  // 随机生成六位邀请码
  function generateInviteCode() {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let code = "";
    for (let i = 0; i < 6; i++) {
      let randomIndex = Math.floor(Math.random() * chars.length);
      code += chars[randomIndex];
    }
    formState.inviteCode = code;
  }

  return {
    formState,
    imageUrl,
    spaceRules,
    submitToSpace,
    generateInviteCode,
  };
}
