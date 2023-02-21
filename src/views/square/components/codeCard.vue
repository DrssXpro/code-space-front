<template>
  <div class="code-card">
    <fs-side-card title="最新代码">
      <template #content>
        <div class="code-item" v-for="i in 5">
          <i class="fa fa-code"></i>
          <div class="code-info">
            <div class="code-name">二分排序</div>
            <div>
              <span>python</span>
              <span>|</span>
              <span>2月前</span>
              <span>|</span>
              <span>7.13KB</span>
            </div>
          </div>
        </div>
      </template>
    </fs-side-card>
  </div>
</template>

<script setup lang="ts">
import FsSideCard from "@/components/FsSideCard/FsSideCard.vue";
</script>

<style scoped lang="less">
.code-item {
  display: flex;
  cursor: pointer;
  padding: 10px;
  .code-info {
    margin-left: 5px;
    font-size: 14px;
    .code-name {
      color: var(--font-main-color);
    }
    span {
      font-size: 12px;
      margin-right: 3px;
    }
  }
  &:hover {
    background-color: var(--bg-color);
  }
}
</style>
