import { collectCode, getCollectList } from "@/service/api/codeRequest";
import { deleteMyComment, getMyCommentList } from "@/service/api/commentRequest";
import { exitSpaceByOwn, updateUserInfoByMe, userUploadAvatar } from "@/service/api/userRequest";
import type { ICodeItem } from "@/types/codeType";
import type { IMyCommentItem } from "@/types/commentType";
import validator from "@/utils/validator";
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from "element-plus";
import { reactive, ref, type Ref } from "vue";

export default function useInfo(formRef?: Ref<FormInstance | undefined>) {
  const { updateUserValidator } = validator;
  // 用户信息：修改
  const userState = reactive({
    name: "",
    email: "",
    nickName: "",
    avatar: "",
    isDefault: true,
  });

  // 我的收藏
  const collectState = reactive({
    collectList: [] as ICodeItem[],
    total: 0,
    page: 1,
    pageSize: 10,
    loading: false,
  });

  // 我的评论
  const commentState = reactive({
    commentList: [] as IMyCommentItem[],
    total: 0,
    pageSize: 10,
    page: 1,
    loading: false,
  });

  // 更新校验
  const updateRules: FormRules = {
    name: [{ validator: updateUserValidator.name, trigger: "blur" }],
    email: [{ validator: updateUserValidator.email, trigger: "blur" }],
    nickName: [{ validator: updateUserValidator.nickName, trigger: "blur" }],
  };

  // 获取用户收藏列表
  async function getCollectListData() {
    collectState.loading = true;
    try {
      const res = await getCollectList({ limit: collectState.pageSize, offset: collectState.page - 1 });
      collectState.collectList = res.data.rows;
      collectState.total = res.data.count;
    } catch (error) {
      ElMessage.warning("获取数据失败");
    }

    collectState.loading = false;
  }

  // 获取我的评论列表
  async function getMyCommentListData() {
    commentState.loading = true;
    try {
      const res = await getMyCommentList({ limit: commentState.pageSize, offset: commentState.page - 1 });
      commentState.commentList = res.data.rows;
      commentState.total = res.data.count;
    } catch (error) {
      ElMessage.warning("获取数据失败");
    }

    commentState.loading = false;
  }

  // 手动退出空间
  async function exitSpace(cb?: Function) {
    ElMessageBox.confirm(`确定要退出这个空间吗？在该空间的信息都会被删除。`, {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(async () => {
      const res = await exitSpaceByOwn();
      res.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
      res.code === 1000 && cb && cb();
    });
  }

  // 取消收藏代码
  async function cancelCollectCode(codeId: string, cb?: Function) {
    ElMessageBox.confirm(`确定要取消收藏id为 ${codeId} 的这个代码片段吗？`, {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(async () => {
      const res = await collectCode(codeId);
      res.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
      res.code === 1000 && cb && cb();
    });
  }

  // 删除我的指定评论
  async function deleteMyCurrentComment(commentId: number, cb?: Function) {
    ElMessageBox.confirm(`确定要取消收藏id为 ${commentId} 的这条评论吗？`, {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(async () => {
      const res = await deleteMyComment(commentId);
      res.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
      res.code === 1000 && cb && cb();
    });
  }

  // 用户头像上传
  async function uploadUserAvatar(file: File) {
    const fd = new FormData();
    fd.append("avatar", file);
    try {
      const res = await userUploadAvatar(fd);
      userState.avatar = res.data;
    } catch (error) {
      ElMessage.error("头像上传失败");
    }
  }

  // 更新用户信息
  async function updateMyInfo(userId: string, file?: File, cb?: Function) {
    if (!formRef?.value) return;
    formRef.value.validate(async (valid) => {
      if (valid) {
        try {
          if (!userState.isDefault && !file) {
            ElMessage.warning("未上传头像");
            return;
          }
          // 上传用户头像:使用默认不进行上传
          !userState.isDefault && file && (await uploadUserAvatar(file));
          // 更新用户信息
          const res = await updateUserInfoByMe(userId, { ...userState });
          res.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
          res.code === 1000 && cb && cb();
        } catch (error) {
          ElMessage.error("更新失败");
        }
      } else {
        ElMessage.warning("输入内容不符合规范");
      }
    });
  }

  return {
    userState,
    collectState,
    commentState,
    updateRules,
    getCollectListData,
    getMyCommentListData,
    cancelCollectCode,
    deleteMyCurrentComment,
    updateMyInfo,
    exitSpace,
  };
}
