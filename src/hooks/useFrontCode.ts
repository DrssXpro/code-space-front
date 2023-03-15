import {
  getCurrentCode,
  getEncryptCodeInfo,
  getEnctryCodeDetail,
  judgetCodeIsencrypt,
  likeCodeBySquare,
  viewCodeBySquare,
} from "@/service/api/codeRequest";
import usePwdStore from "@/stores/usePwdStore";
import useUserStore from "@/stores/userStore";
import type { CodePart, ICodeDetail } from "@/types/codeType";
import { __debounce } from "@/utils/tools";
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

export default function useFrontCode() {
  // 代码详情
  const squareCodeDetail = ref<ICodeDetail>();
  // 部分代码信息
  const partCode = ref<CodePart>();

  // 密码表单
  const pwdState = reactive({
    pwd: "",
  });

  const $router = useRouter();

  // 登录信息：收藏使用
  const { userInfo } = useUserStore();

  const { addCodePwd } = usePwdStore();

  // 获取代码详情
  async function getSquareCodeDetail(codeId: string) {
    const res = await getCurrentCode(codeId, true);
    squareCodeDetail.value = res.data;
  }

  // 获取代码部分信息：解密界面使用
  async function getPartCode(codeId: string) {
    const res = await getEncryptCodeInfo(codeId, true);
    partCode.value = res.data;
  }

  // 加密密码验证 + 获取代码信息
  async function getEncryptCode(codeId: string) {
    const res = await getEnctryCodeDetail(codeId, { ...pwdState }, true);
    res.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
    if (res.code === 1000) {
      squareCodeDetail.value = res.data;
      addCodePwd(res.data.id); // 输入密码正确：将代码id缓存至本地防止被路由拦截
      $router.push(`/code/${squareCodeDetail.value.id}`);
    }
  }

  // 增加代码浏览量
  async function addCodeViewBySquare(codeId: string) {
    await viewCodeBySquare(codeId);
  }

  // 判断密码是否加密
  function judeIsEnctrypt(codeId: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await judgetCodeIsencrypt(codeId);
        res.code !== 1101 ? resolve("pass") : reject("no");
      } catch (error) {
        reject("no");
      }
    });
  }

  // 增加代码点赞量
  const addCodeLikeBySquare = __debounce(async function (codeId: string) {
    const res = await likeCodeBySquare(codeId);
    res.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
    squareCodeDetail.value && squareCodeDetail.value.liked++;
  }, 500);

  // 收藏代码
  const collectCode = __debounce(function () {
    if (!userInfo) {
      ElMessage.warning("请先进行登录");
      return;
    }
    ElMessage.success("收藏成功");
  }, 500);

  return {
    squareCodeDetail,
    partCode,
    pwdState,
    getSquareCodeDetail,
    addCodeViewBySquare,
    judeIsEnctrypt,
    addCodeLikeBySquare,
    collectCode,
    getPartCode,
    getEncryptCode,
  };
}
