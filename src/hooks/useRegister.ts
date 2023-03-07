import { userRegister } from "@/service/api/userRequest";
import validator from "@/utils/validator";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { reactive, type Ref } from "vue";

const { registerValidator } = validator;

export default function useRegister(formRef: Ref<FormInstance | undefined>) {
  const registerState = reactive({
    // 用户名
    username: "",
    // 密码
    password: "",
    // 重复密码
    repeatpwd: "",
    // 注册邮箱
    email: "",
  });

  // 自定义校验密码重复规则
  function validRepeat(rules: any, value: any, callback: any) {
    if (value == "") {
      throw new Error("重复密码不能为空");
    } else if (value !== registerState.password) {
      throw new Error("两次密码输入不一致");
    } else if (value.length < 6 || value.length > 16) {
      callback(new Error("密码长度需要在6-16位之间"));
    } else {
      callback();
    }
  }

  // 注册校验逻辑
  const registerRules: FormRules = {
    username: [{ validator: registerValidator.username, trigger: "blur" }],
    password: [{ validator: registerValidator.password, trigger: "blur" }],
    email: [{ validator: registerValidator.email, trigger: "blur" }],
    repeatpwd: [{ validator: validRepeat, trigger: "blur" }],
  };

  // 注册提交逻辑
  function submitToRegister(cb: Function) {
    if (!formRef.value) return;
    formRef.value.validate(async (valid) => {
      if (valid) {
        try {
          const res = await userRegister({
            username: registerState.username,
            password: registerState.password,
            email: registerState.email,
          });
          res.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
          // 注册成功进行回调
          res.code === 1000 && cb();
        } catch (err) {
          ElMessage.warning("登录失败");
        }
      } else {
        ElMessage.warning("输入内容有误");
      }
    });
  }

  return {
    registerState,
    registerRules,
    submitToRegister,
  };
}
