import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import validator from "@/utils/validator";
import { reactive, ref, type Ref } from "vue";
import { addSpace, updateSpace } from "@/service/api/spaceRequest";
import useUserStore from "@/stores/userStore";

const { spaceValidator } = validator;
export default function useSpace(formRef: Ref<FormInstance | undefined>) {
  const { userInfo } = useUserStore();
  const formState = reactive({
    // 空间名
    spacename: "",
    // 空间介绍
    spaceintroduce: "",

    // 邀请码
    inviteCode: "",

    // 是否使用默认头像
    isDefault: 1,

    // 空间头像地址（不使用默认头像）
    avatar: "",
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
  async function submitToSpace(isEdit: boolean, cb?: Function) {
    if (!formRef.value) return;
    formRef.value.validate(async (valid) => {
      if (valid) {
        if (!isEdit) {
          // 创建操作
          try {
            const userId = userInfo?.id;
            const res = await addSpace(userId!, {
              spaceintroduce: formState.spaceintroduce,
              spacename: formState.spacename,
              inviteCode: formState.inviteCode,
              avatar: formState.avatar.length ? formState.avatar : undefined,
            });
            res.code === 1000 ? ElMessage.success("设置成功") : ElMessage.warning(res.message);
            res.code === 1000 && cb && cb(); // 操作成功后执行回调
          } catch (err) {
            ElMessage.warning("设置失败");
          }
        } else {
          // 修改操作
          const spaceId = userInfo?.space?.spaceId as number;
          const res = await updateSpace(spaceId, {
            spaceintroduce: formState.spaceintroduce,
            spacename: formState.spacename,
            inviteCode: formState.inviteCode,
            avatar: formState.avatar.length ? formState.avatar : undefined,
          });
          res.code === 1000 ? ElMessage.success("修改成功") : ElMessage.warning(res.message);
          res.code === 1000 && cb && cb(); // 操作成功后执行回调
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
