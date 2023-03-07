<template>
  <el-sub-menu
    :index="props.menuItem.routePath || `${props.menuItem.id}`"
    v-if="props.menuItem.children?.length && props.menuItem.menuType === 'M'"
  >
    <template #title>
      <i :class="`${props.menuItem.menuIcon} icon`"></i>
      <span>{{ props.menuItem.name }}</span>
    </template>
    <el-menu-item v-for="(item, index) in props.menuItem.children" :key="index" :index="item.routePath"
      >{{ item.name }}
      <template v-for="(i, index) in item.children" :key="index">
        <fs-deep-menu :menu-item="i" />
      </template>
    </el-menu-item>
  </el-sub-menu>
  <el-menu-item v-else-if="props.menuItem.menuType === 'D'" :index="props.menuItem.routePath">{{
    props.menuItem.name
  }}</el-menu-item>
</template>

<script setup lang="ts">
import type { IMenuItem } from "@/types/menuType";

const props = defineProps<{
  menuItem: IMenuItem;
}>();
</script>

<style scoped lang="less">
.icon {
  font-size: 18px;
  margin-right: 10px;
}
</style>
