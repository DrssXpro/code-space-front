<template>
  <div class="fs-table-container" v-loading="props.loading">
    <div class="fs-table-header">
      <slot name="header" />
    </div>
    <el-table style="width: 100%" :data="props.listData" row-key="id" border>
      <el-table-column
        v-if="props.showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <template v-for="item in props.tableConfig" :key="item.index">
        <el-table-column v-bind="item" align="center">
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot></template
          >
        </el-table-column>
      </template>
    </el-table>
    <div class="fs-table-footer" v-if="props.showFooter">
      <slot>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          :total="listCount"
          background
          layout="prev, pager, next"
        ></el-pagination>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ITableConifg } from "./type";
const emit = defineEmits<{
  (e: "pageChange", current: number): void;
  (e: "pageSizeChange", pageSize: number): void;
}>();

interface PropsType {
  listData: any[];
  tableConfig: ITableConifg[];
  listCount?: number;
  pageSize?: number;
  showIndexColumn?: boolean; // 展示index列
  showFooter?: boolean;
  loading: boolean;
}
const props = withDefaults(defineProps<PropsType>(), {
  showFooter: true,
  showIndexColumn: false,
});

const handleSizeChange = (pageSize: number) => {
  emit("pageSizeChange", pageSize);
};

const handleCurrentChange = (current: number) => {
  emit("pageChange", current);
};
</script>

<style scoped lang="less">
.fs-table-container {
  width: 100%;

  .fs-table-footer {
    margin-top: 15px;
    display: flex;
    justify-content: end;
  }
}
</style>
