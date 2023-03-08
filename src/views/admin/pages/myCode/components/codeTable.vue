<template>
  <div class="code-table">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="编号" width="100" align="center" />
      <el-table-column prop="date" label="标题" width="150" align="center" />
      <el-table-column prop="date" label="语言" align="center" />
      <el-table-column prop="date" label="内容" align="center" />
      <el-table-column prop="date" label="链接" align="center" />
      <el-table-column prop="date" label="状态" align="center" width="80" />
      <el-table-column prop="date" label="创建时间" align="center" />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button link type="success" @click="handleCheckCode">详情</el-button>
          <el-button link type="info" @click="handleEditCode">编辑</el-button>
          <el-button type="primary" link>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="data-page">
      <el-pagination background layout="prev, pager, next" :total="50" />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "editCode"): void;
  (e: "checkCode"): void;
}>();
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];

const handleCheckCode = () => {
  emit("checkCode");
};

const handleEditCode = () => {
  emit("editCode");
};
</script>

<style scoped lang="less">
@import "../public.less";
.code-table {
  width: 100%;
  min-height: calc(100vh - 230px);
  .public-container();
  .data-page {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
