<template>
  <div class="switch-container" @click="emitChange">
    <div :class="['icon', props.modelValue ? ' iconActive' : '']">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps<{
  modelValue: boolean;
  activeColor: string;
  unActiveColor: string;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", status: boolean): void;
  (event: "changeStatus", status: boolean): void;
}>();

const emitChange = () => {
  emit("update:modelValue", !props.modelValue);
  emit("changeStatus", props.modelValue);
};

const styleChange = computed(() => {
  return {
    bgColor: props.modelValue ? props.activeColor : props.unActiveColor,
    checkBgColor: props.modelValue ? props.unActiveColor : props.activeColor,
    reverseColor: props.modelValue ? props.activeColor : props.unActiveColor,
    switchTransform: `translateX(${props.modelValue ? 100 : 0}%)`,
  };
});
</script>

<style scoped lang="less">
.switch-container {
  position: relative;
  aspect-ratio: 2 / 1;
  height: 25px;
  background-color: v-bind("styleChange.bgColor");
  border: 1px solid v-bind("styleChange.checkBgColor");
  border-radius: 30px;
  cursor: pointer;
  .icon {
    position: absolute;
    aspect-ratio: 1 / 1;
    height: 25px;
    background-color: v-bind("styleChange.checkBgColor");
    transform: v-bind("styleChange.switchTransform");
    color: v-bind("styleChange.reverseColor");
    border-radius: 50%;
    transition: transform 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
