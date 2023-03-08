<template>
  <div class="space-people-container">
    <div class="space-people-form gap-item">
      <fs-form ref="fsFormRef" :form-config="formConfigReactive" v-model="formData">
        <template #operator>
          <el-button type="danger" class="btn" @click="searchDataList"
            ><i class="fa fa-search"></i><span>查询</span></el-button
          >
          <el-button type="info" class="btn" @click="resetForm"
            ><i class="fa fa-refresh"></i><span>重置</span></el-button
          >
        </template>
      </fs-form>
    </div>
    <div class="space-people-table gap-item">
      <fs-table
        :list-data="tableData"
        :list-count="50"
        :loading="loading"
        :page-size="page.pageSize"
        @page-change="handlePageChange"
        :table-config="tableConfig"
        :show-index-column="false"
      >
        <template #header>
          <div class="header-config">
            <span>人员列表</span>
            <el-button type="primary" @click="showAddModal">邀请人员</el-button>
          </div>
        </template>
        <template #createdAt="{ row }">
          <el-tag type="danger">{{ row.createdAt }}</el-tag>
        </template>
        <template #operator="{ row }">
          <el-button type="success" link>编辑</el-button>
          <el-button type="danger" link>删除</el-button>
        </template>
      </fs-table>

      <fs-modal
        v-model="modalData"
        ref="fsModalRef"
        title="邀请人员"
        :modal-config="modalConfig"
        :mobal-rules="modalValid"
      >
        <template #footer>
          <el-button @click="closeModal">取消</el-button>
          <el-button type="primary" @click="handleAdd">添加</el-button>
        </template>
      </fs-modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FsForm from "@/components/FsForm/FsForm.vue";
import FsTable from "@/components/FsTable/FsTable.vue";
import FsModal from "@/components/FsModal/FsModal.vue";
import tableConfig from "./config/table.config";
import formConfig from "./config/form.config";
import { modalConfig, modalValid } from "./config/modal.config";
import { ElMessage } from "element-plus";
const fsFormRef = ref<InstanceType<typeof FsForm>>();
const fsModalRef = ref<InstanceType<typeof FsModal>>();
const formConfigReactive = ref(formConfig);
const loading = ref(false);

const formData = ref({
  title: "1",
  lan: "1",
});

const modalData = ref({
  title: "1",
  lan: "2",
});

const page = ref({
  current: 1,
  pageSize: 10,
});

const searchDataList = () => {
  console.log("check:", formData.value);
};

const handlePageChange = (current: number) => {
  console.log(current);
};

const showAddModal = () => {
  fsModalRef.value?.controllModal(true);
};

const closeModal = () => {
  fsModalRef.value?.controllModal(false);
};

const resetForm = () => {
  fsFormRef.value && fsFormRef.value.formRef?.resetFields();
};

const handleAdd = async () => {
  if (fsModalRef.value && fsModalRef.value.formRef) {
    await fsModalRef.value.formRef.validate((valid, fields) => {
      if (valid) {
        ElMessage.success("验证通过");
      } else {
        ElMessage.error("验证失败");
      }
    });
  }
};
fsModalRef.value && fsModalRef.value.formRef?.resetFields();

const resetModal = () => {
  console.log(fsModalRef.value && fsModalRef.value.treeRef[0].getCheckedKeys(false));
  // fsModalRef.value && fsModalRef.value.formRef?.resetFields();
};
const tableData = [
  {
    test1: "2016-05-03",
    test2: "Tom",
    test3: "abc",
    createdAt: "No. 189, Grove St",
    updatedAt: "No. 189, Grove St",
  },
  {
    test1: "2016-05-03",
    test2: "Tom",
    test3: "abc",
    createdAt: "No. 189, Grove St",
    updatedAt: "No. 189, Grove St",
  },
  {
    test1: "2016-05-03",
    test2: "Tom",
    test3: "abc",
    createdAt: "No. 189, Grove St",
    updatedAt: "No. 189, Grove St",
  },
  {
    test1: "2016-05-03",
    test2: "Tom",
    test3: "abc",
    createdAt: "No. 189, Grove St",
    updatedAt: "No. 189, Grove St",
  },
  {
    test1: "2016-05-03",
    test2: "Tom",
    test3: "abc",
    createdAt: "No. 189, Grove St",
    updatedAt: "No. 189, Grove St",
  },
  {
    test1: "2016-05-03",
    test2: "Tom",
    test3: "abc",
    createdAt: "No. 189, Grove St",
    updatedAt: "No. 189, Grove St",
  },
  {
    test1: "2016-05-03",
    test2: "Tom",
    test3: "abc",
    createdAt: "No. 189, Grove St",
    updatedAt: "No. 189, Grove St",
  },
  {
    test1: "2016-05-03",
    test2: "Tom",
    test3: "abc",
    createdAt: "No. 189, Grove St",
    updatedAt: "No. 189, Grove St",
  },
];
</script>

<style scoped lang="less">
@import "../public.less";

.space-people-container {
  width: 100%;

  .space-people-form {
    width: 100%;
    .public-container();
    .form-container();

    .btn {
      display: flex;
      align-items: center;
      i {
        margin-right: 5px;
      }
    }
  }

  .space-people-table {
    width: 100%;
    min-height: calc(100vh - 230px);
    .public-container();
    .header-config {
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 20px;
      }
      margin-bottom: 20px;
    }
  }
}
</style>
