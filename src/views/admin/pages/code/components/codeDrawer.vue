<template>
  <div class="code-drawer-container">
    <el-drawer v-model="showDrawer" :title="props.title" append-to-body>
      <div class="code-form">
        <el-form>
          <el-form-item label="代码编号">
            <el-input v-model="state.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="代码标题">
            <el-input v-model="state.title" :disabled="!props.isEdit"></el-input>
          </el-form-item>
          <el-form-item label="编程语言">
            <el-select
              v-model="state.lan"
              @change="handleLanChange"
              placeholder="请选择合适的语言"
              :disabled="!props.isEdit"
            >
              <el-option v-for="(item, index) in codes" :key="index" :label="item.text" :value="index" />
            </el-select>
          </el-form-item>
          <el-form-item label="是否加密">
            <el-switch v-model="state.isCode" :disabled="!props.isEdit"></el-switch>
          </el-form-item>
          <el-form-item label="加密密码" v-show="state.isCode">
            <el-input v-model="state.code" :disabled="!props.isEdit"></el-input>
          </el-form-item>
          <el-form-item label="是否公开">
            <el-radio-group v-model="state.isPrivate" :disabled="!props.isEdit">
              <el-radio label="1">公开</el-radio>
              <el-radio label="2">私有</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="代码内容">
            <fs-code-mirror ref="codeMirrorRef" :code="state.content" :disabled="!props.isEdit" height="auto" />
          </el-form-item>
        </el-form>
        <div class="operator-btn" v-show="props.isEdit">
          <el-button type="success" plain @click="showDrawer = false">取消</el-button>
          <el-button type="primary" plain>保存修改</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import FsCodeMirror from "@/components/FsCodeMirror/FsCodeMirror.vue";
const props = defineProps<{
  title: string;
  isEdit: boolean;
}>();

const codeMirrorRef = ref<InstanceType<typeof FsCodeMirror>>();

const state = reactive({
  id: "abcdef",
  title: "二分查找",
  lan: 0,
  isCode: false,
  isPrivate: "1",
  code: "",
  content: `void quick_sort(int q[], int l, int r)
{
    if (l >= r) return;

    int i = l - 1, j = r + 1, x = q[l + r >> 1];
    while (i < j)
    {
        do i ++ ; while (q[i] < x);
        do j -- ; while (q[j] > x);
        if (i < j) swap(q[i], q[j]);
    }
    quick_sort(q, l, j), quick_sort(q, j + 1, r);
}
`,
});
const showDrawer = ref(false);

const handleLanChange = () => {
  codeMirrorRef.value?.configCodeMirror(codes[state.lan].text);
};

const codes = [
  {
    text: "cpp",
  },
  {
    text: "Java",
  },
  {
    text: "JavaScript",
  },
  {
    text: "Python",
  },
  {
    text: "PHP",
  },
  {
    text: "HTML",
  },
  {
    text: "CSS",
  },
  {
    text: "SQL",
  },
  {
    text: "Vue",
  },
];

const controllDrawer = (isShow: boolean) => {
  showDrawer.value = isShow;
};

defineExpose({
  controllDrawer,
});
</script>

<style scoped lang="less">
.operator-btn {
  display: flex;
  justify-content: end;
  align-items: center;
}
</style>
