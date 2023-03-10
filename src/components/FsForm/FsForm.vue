<template>
  <div class="fs-form-container">
    <el-form class="form-container" ref="formRef" :model="formData">
      <el-form-item
        v-for="(item, index) in formConfigReactive"
        :label="item.label"
        :labelWidth="`${item.labelWidth ? item.labelWidth + 'px' : 'auto'}`"
        :prop="`${item.field}`"
        :key="index"
      >
        <template v-if="item.type === 'input' || item.type === 'password'">
          <el-input
            v-model="formData[`${item.field}`]"
            :placeholder="item.placeholder"
            :show-password="item.type === 'password'"
          ></el-input>
        </template>
        <template v-if="item.type === 'select'">
          <el-select :placeholder="item.placeholder" v-model="formData[`${item.field}`]">
            <el-option
              v-for="(selectItem, index) in item.options"
              :key="index"
              :label="selectItem.text"
              :value="selectItem.value"
            />
          </el-select>
        </template>
        <template v-if="item.type === 'remoteSelect'">
          <el-select
            v-model="formData[`${item.field}`]"
            filterable
            remote
            reserve-keyword
            remote-show-suffix
            :placeholder="item.placeholder"
            :remote-method="(searchValue:string) => remoteMethod(searchValue,item.field)"
            :loading="remoteLoading"
          >
            <el-option
              v-for="(selectItem, index) in item.options"
              :key="selectItem.text"
              :label="selectItem.text"
              :value="selectItem.value"
            /> </el-select
        ></template>
      </el-form-item>
      <div class="form-operator">
        <slot name="operator" />
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from "element-plus";
import { ref, watch } from "vue";
import type { IFormConfigItem } from "./type";
interface IFormConfig {
  formConfig: IFormConfigItem[];
  modelValue: any;
}

const props = defineProps<IFormConfig>();
const emit = defineEmits<{
  (e: "update:modelValue", newValue: any): void;
}>();

const formRef = ref<FormInstance>();
const formData = ref({ ...props.modelValue });
const formConfigReactive = ref(props.formConfig);
const remoteLoading = ref(false);

// 远程搜索获取数据方法
const remoteMethod = async (searchValue: string, field: string) => {
  if (searchValue.length) {
    remoteLoading.value = true;
    const current = formConfigReactive.value.find((item: any) => item.field === field) as IFormConfigItem;
    current.remoteSelectFunction &&
      current
        .remoteSelectFunction(searchValue)
        .then((res) => {
          current.options = res;
        })
        .finally(() => {
          remoteLoading.value = false;
        });
  }
};

watch(
  () => formData.value,
  (newValue) => {
    emit("update:modelValue", newValue);
  },
  {
    deep: true,
  }
);

defineExpose({
  formRef,
});
</script>

<style scoped lang="less">
.form-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  .el-form-item {
    margin-bottom: 0;
  }
  .form-operator {
    display: flex;
    align-items: center;
  }
  :deep(.el-form-item__label) {
    color: var(--font-main-color);
  }
}
</style>
