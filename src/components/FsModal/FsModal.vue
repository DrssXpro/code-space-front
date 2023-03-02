<template>
  <el-dialog v-model="showModal" :title="props.title" :width="props.width || '25%'" append-to-body>
    <el-form class="fs-modal-form" :model="formData" :rules="props.mobalRules" ref="formRef">
      <el-form-item
        v-for="(item, index) in props.modalConfig"
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
        <template v-if="item.type === 'switch'">
          <el-switch v-model="formData[`${item.field}`]" :placeholder="item.placeholder"></el-switch>
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
        <template v-if="item.type === 'tree'">
          <el-tree
            ref="treeRef"
            :data="item.treeOptions"
            show-checkbox
            node-key="id"
            :default-expanded-keys="item.defaultExpandedKey || []"
            :default-checked-keys="item.defaultCheckKey || []"
            :props="treeProps"
        /></template>

        <template v-if="item.type === 'upload'">
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="formData[`${item.field}`]" :src="formData[`${item.field}`]" class="avatar" />
            <div v-else class="upload-icon">+</div>
          </el-upload>
        </template>
      </el-form-item>
    </el-form>
    <template #footer>
      <slot name="footer" />
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElMessage, type FormInstance, type FormRules, type UploadProps } from "element-plus";
import type { IModalConfigItem } from "./type";
interface IModalProps {
  title: string;
  width?: string;
  modalConfig: IModalConfigItem[];
  mobalRules: FormRules;
  modelValue: any;
}

const props = defineProps<IModalProps>();
const formRef = ref<FormInstance>();
const treeRef = ref<any>();
const formData = ref({ ...props.modelValue });

const showModal = ref(false);

const treeProps = {
  children: "children",
  label: "label",
};

const controllModal = (isSHow: boolean) => {
  showModal.value = isSHow;
};

const handleAvatarSuccess: UploadProps["onSuccess"] = (response, uploadFile) => {
  // state.imageUrl = URL.createObjectURL(uploadFile.raw!);
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }

  return true;
};

defineExpose({ controllModal, formRef, treeRef });
</script>

<style scoped lang="less">
.avatar-uploader {
  border: 1px dashed var(--el-border-color);
  width: 100px;
  height: 100px;
  display: block;
  .upload-icon {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
  }
}
</style>
