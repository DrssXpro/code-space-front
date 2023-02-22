<template>
  <div class="code-content">
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
          <el-button link type="success">详情</el-button>
          <el-button link type="info">编辑</el-button>
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
</script>

<style scoped lang="less">
.code-content {
  width: 100%;
  min-height: calc(100vh - 230px);
  background-color: var(--el-bg-color-overlay);
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  padding: 20px;
  .data-page {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
