import { collectCode, getCollectList } from "@/service/api/codeRequest";
import { deleteMyComment, getMyCommentList } from "@/service/api/commentRequest";
import type { ISquareCodeItem } from "@/types/codeType";
import type { ICommentItem, IMyCommentItem } from "@/types/commentType";
import { ElMessage, ElMessageBox, type FormInstance } from "element-plus";
import { reactive } from "vue";

export default function useInfo(formRef?: FormInstance | undefined) {
  const collectState = reactive({
    collectList: [] as ISquareCodeItem[],
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

  // 获取用户收藏列表
  async function getCollectListData() {
    collectState.loading = true;
    try {
      const res = await getCollectList({ limit: collectState.pageSize, offset: collectState.page - 1 });
      console.log(res.data);
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

  return {
    collectState,
    commentState,
    getCollectListData,
    getMyCommentListData,
    cancelCollectCode,
    deleteMyCurrentComment,
  };
}
