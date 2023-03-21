import { addMenu, deleteMenu, getMenuList, updateMenu } from "@/service/api/menuRequest";
import type { IMenuItem, IMenuPayload } from "@/types/menuType";
import { handleMenuToTree } from "@/utils/tools";
import validator from "@/utils/validator";
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from "element-plus";
import { reactive, ref, type Ref } from "vue";

export default function usePowerMenu(formRef?: Ref<FormInstance | undefined>) {
  // modal验证规则
  const { menuValidator } = validator;

  // 表单loading
  const formLoading = ref(false);

  // modal状态
  const showModal = ref(false);

  // options list
  const menus = ref<any[]>([]);

  // 表单参数
  const formState: IMenuPayload = reactive({
    name: "",
    menuIcon: "",
    routePath: "",
    comPath: "",
    perms: "",
    menuType: "M",
    status: 1,
    parentId: 1,
    orderNum: 1,
  });

  // 搜索参数
  const searchState = ref({ kw: "", type: "" });

  // 表格数据
  const tableState = reactive({
    tableData: [] as IMenuItem[],
    loading: false,
    currentPage: 1,
    pageSize: 10,
    total: 0,
  });

  const menuRules: FormRules = {
    name: [{ validator: menuValidator.name, trigger: "blur" }],
    menuIcon: [{ validator: menuValidator.menuIcon, trigger: "blur" }],
    routePath: [{ validator: menuValidator.routePath, trigger: "blur" }],
    comPath: [{ validator: menuValidator.comPath, trigger: "blur" }],
    perms: [{ validator: menuValidator.perms, trigger: "blur" }],
    menuType: [{ validator: menuValidator.menuType, trigger: "blur" }],
    status: [{ validator: menuValidator.status, trigger: "blur" }],
  };

  // 添加 menu
  async function addMenuData(cb?: Function) {
    if (!formRef?.value) return;
    formRef.value.validate(async (valid) => {
      if (valid) {
        try {
          const res = await addMenu({ ...formState });
          res.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
          res.code === 1000 && cb && cb();
        } catch (error) {
          ElMessage.warning("添加失败");
        }
      } else {
        ElMessage.warning("输入内容不符合规范");
      }
    });
  }

  // 编辑 menu
  async function updateMenuData(menuId: number, cb?: Function) {
    if (!formRef?.value) return;
    formRef.value.validate(async (valid) => {
      if (valid) {
        try {
          const res = await updateMenu(menuId!, { ...formState });
          res.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
          res.code === 1000 && cb && cb();
        } catch (error) {
          ElMessage.warning("编辑失败");
        }
      } else {
        ElMessage.warning("输入内容不符合规范");
      }
    });
  }

  // 删除 menu
  async function deleteMenuData(menuId: number, cb?: Function) {
    ElMessageBox.confirm(`确定要删除id为 ${menuId} 的这个菜单或权限吗？`, {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(async () => {
      const res = await deleteMenu(menuId);
      res.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
      res.code === 1000 && cb && cb();
    });
  }

  async function getMenuListByOptions() {
    const res = getMenuList({ kw: "" });
    menus.value = handleMenuToTree(
      (await res).data.rows.map((item) => ({ label: item.name, value: item.id, parentId: item.parentId, id: item.id }))
    );
  }

  // 获取菜单列表数据
  async function getMenuListData() {
    tableState.loading = true;
    try {
      const res = await getMenuList({ kw: searchState.value.kw, type: searchState.value.type as "M" | "D" | "B" });
      tableState.tableData = handleMenuToTree(res.data.rows) as IMenuItem[];
      tableState.total = res.data.count;
    } catch (error) {
      ElMessage.warning("获取列表数据失败");
    }
    tableState.loading = false;
  }

  return {
    showModal,
    formLoading,
    formState,
    searchState,
    tableState,
    menus,
    menuRules,
    addMenuData,
    updateMenuData,
    getMenuListData,
    deleteMenuData,
    getMenuListByOptions,
  };
}
