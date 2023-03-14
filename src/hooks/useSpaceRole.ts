import { getMenuListBySpace } from "@/service/api/menuRequest";
import { addRole, addRoleBySpace, deleteRole, getRoleListBySpace, updateRole } from "@/service/api/roleRequest";
import type { IMenuItem } from "@/types/menuType";
import type { IRoleFormPayload, IRoleItem } from "@/types/roleType";
import { handleMenuToTree } from "@/utils/tools";
import validator from "@/utils/validator";
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from "element-plus";
import { reactive, ref, type Ref } from "vue";

export default function useSpaceRole(formRef?: Ref<FormInstance | undefined>, treeRef?: Ref<any>) {
  // modal验证规则
  const { roleValidator } = validator;
  // 搜索loading
  const searchLoading = ref(false);

  // 表单loading
  const formLoading = ref(false);

  // 控制modal状态
  const showModal = ref(false);

  // 编辑 or 添加 form
  const formState: IRoleFormPayload = reactive({
    // 角色名称
    name: "",
    // 角色介绍
    introduce: "",
    // 角色权限标识
    roleChar: "",
    // 角色权限列表
    menuList: [],
    // 角色状态
    status: 1,
  });

  // 搜索条件 form
  const searchForm = ref({ kw: "", status: 1 });

  // 菜单列表
  const allMenus = ref<IMenuItem[]>();

  // 表格数据
  const tableState = reactive({
    tableData: [] as IRoleItem[],
    loading: false,
    currentPage: 1,
    pageSize: 10,
    total: 0,
  });

  // role 校验
  const roleRules: FormRules = {
    name: [{ validator: roleValidator.name, trigger: "blur" }],
    introduce: [{ validator: roleValidator.introduce, trigger: "blur" }],
    roleChar: [{ validator: roleValidator.roleChar, trigger: "blur" }],
    status: [{ validator: roleValidator.status, trigger: "blur" }],
    menuList: [{ validator: roleValidator.menuList, trigger: "blur" }],
  };

  // 添加 role
  async function addRoleDataBySpace(cb?: Function) {
    if (!formRef?.value) return;
    formState.menuList = treeRef?.value.getCheckedKeys(false) as number[]; // 注意：需要在校验之前进行赋值，不然会造成校验不通过
    formRef.value.validate(async (valid) => {
      if (valid) {
        try {
          formLoading.value = true;
          const res = await addRoleBySpace({
            ...formState,
          });
          res.code === 1000 ? ElMessage.success("添加成功") : ElMessage.warning(res.message);
          res.code === 1000 && cb && cb();
        } catch (error) {
          ElMessage.warning("添加失败");
        }
        formLoading.value = false;
      } else {
        ElMessage.warning("输入内容不符合规范");
      }
    });
  }

  // 更新role
  async function updateRoleDataBySpace(roleId: number, cb?: Function) {
    if (!formRef?.value) return;
    formState.menuList = treeRef?.value.getCheckedKeys(false) as number[]; // 注意：需要在校验之前进行赋值，不然会造成校验不通过
    formRef.value.validate(async (valid) => {
      if (valid) {
        try {
          formLoading.value = true;
          const res = await updateRole(roleId, {
            ...formState,
          });
          res.code === 1000 ? ElMessage.success("编辑成功") : ElMessage.warning(res.message);
          res.code === 1000 && cb && cb();
        } catch (error) {
          ElMessage.warning("编辑失败");
        }
        formLoading.value = false;
      } else {
        ElMessage.warning("输入内容不符合规范");
      }
    });
  }

  // 删除 role
  async function deleteRoleBySpace(roleId: number, cb?: Function) {
    ElMessageBox.confirm(`确定要删除id为 ${roleId} 的这个角色吗？`, {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(async () => {
      const res = await deleteRole(roleId);
      res.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
      res.code === 1000 && cb && cb();
    });
  }

  // 获取所有菜单权限列表
  async function getMenuListData() {
    const res = await getMenuListBySpace();
    allMenus.value = handleMenuToTree(res.data) as IMenuItem[];
  }

  // 获取role列表数据
  async function getRoleListData() {
    tableState.loading = true;
    try {
      const res = await getRoleListBySpace({ limit: tableState.pageSize, offset: tableState.currentPage - 1 });
      tableState.tableData = res.data.rows;
      tableState.total = res.data.count;
    } catch (error) {
      ElMessage.warning("获取列表数据失败");
    }
    tableState.loading = false;
  }

  return {
    formState,
    tableState,
    searchForm,
    searchLoading,
    formLoading,
    showModal,
    roleRules,
    allMenus,
    addRoleDataBySpace,
    updateRoleDataBySpace,
    deleteRoleBySpace,
    getRoleListData,
    getMenuListData,
  };
}
