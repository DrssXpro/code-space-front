import { deleteCommentByAdmin, getCommentListByAdmin } from "@/service/api/commentRequest";
import { ElMessage, ElMessageBox } from "element-plus";
import { reactive, ref } from "vue";

export default function useAdminComment() {
  const searchState = ref({
    kw: "",
    code: "",
  });
  // 表格
  const commentState = reactive({
    commentList: [],
    page: 1,
    pageSize: 10,
    total: 0,
    loading: false,
  });

  // 删除指定的评论
  function deleteCurrentCommentByAdmin(commentId: number, cb?: Function) {
    ElMessageBox.confirm(`确定要删除id为 ${commentId} 的这条评论吗？`, {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(async () => {
      const res = await deleteCommentByAdmin(commentId);
      res.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
      res.code === 1000 && cb && cb();
    });
  }

  // 管理员获取评论列表
  async function getCommentListByAdminData() {
    try {
      commentState.loading = true;
      const res = await getCommentListByAdmin({
        limit: commentState.pageSize,
        offset: (commentState.page - 1) * commentState.pageSize,
        kw: searchState.value.kw,
        code: searchState.value.code,
      });
      commentState.commentList = res.data.rows;
      commentState.total = res.data.count;
    } catch (error) {
      ElMessage.error("获取数据列表失败");
    }
    commentState.loading = false;
  }

  return {
    searchState,
    commentState,
    getCommentListByAdminData,
    deleteCurrentCommentByAdmin,
  };
}
