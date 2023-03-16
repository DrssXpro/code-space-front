import { collectCode, getCollectList } from "@/service/api/codeRequest";
import type { ISquareCodeItem } from "@/types/codeType";
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

  return {
    collectState,
    getCollectListData,
    cancelCollectCode,
  };
}
