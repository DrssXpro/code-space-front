<template>
  <div class="fs-side-card">
    <div class="fs-side-card__title">
      <div class="title-content">{{ props.title }}</div>
      <div class="title-operator"><slot name="operator" /></div>
    </div>
    <div class="fs-side-card__content">
      <slot name="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();
</script>

<style scoped lang="less">
.fs-side-card {
  width: 100%;

  background-color: var(--main-color);
  border-radius: 10px;
  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--font-color);
    padding: 20px;
    color: var(--font-main-color);
    font-weight: 700;
    .title-content {
      font-size: 18px;
    }
  }
}
</style>
