import { getSpaceUserList } from "@/service/api/spaceRequest";
import type { ISpaceUserItem } from "@/types/userType";
import { ElMessage } from "element-plus";
import { reactive } from "vue";

export default function useSpaceUser() {
  // 表格
  const userState = reactive({
    userList: [] as ISpaceUserItem[],
    pageSize: 10,
    page: 1,
    total: 0,
    loading: false,
  });

  // 获取空间用户列表
  async function getSpaceUserListData() {
    userState.loading = true;
    try {
      const res = await getSpaceUserList({ limit: userState.pageSize, offset: userState.page - 1 });
      userState.userList = res.data.rows;
      userState.total = res.data.count;
    } catch (error) {
      ElMessage.error("获取数据列表失败");
    }
    userState.loading = false;
  }

  return {
    userState,
    getSpaceUserListData,
  };
}
