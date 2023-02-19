<template>
  <img v-if="!show" ref="fakeImageRef" :src="FAKE_IMAGE" alt="" />
  <img v-else ref="imageRef" :src="props.src" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FAKE_IMAGE } from "@/config/config";
import { imageIsLoading } from "@/utils/tools";
import useDomObserver from "@/hooks/useDomObserver";
const show = ref(false);

const fakeImageRef = ref<HTMLImageElement>(),
  imageRef = ref<HTMLImageElement>();

const props = defineProps<{
  src: string;
  lazy?: boolean;
}>();

if (props.lazy) {
  useDomObserver(fakeImageRef, isLoad);
} else {
  isLoad();
}

async function isLoad() {
  if (!props.src.trim().length) return;
  await imageIsLoading(props.src);
  show.value = true;
}
</script>

<style scoped lang="less">
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
