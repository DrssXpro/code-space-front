<template>
  <div class="content-people-container">
    <div class="gap-item">
      <people-rules @add-user="showInviteDialog" />
    </div>
    <div class="gap-item">
      <people-table @edit-people="showEditDialog" />
    </div>
    <invite-dialog ref="inviteDialogRef" />
    <edit-dialog ref="editDialogRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import inviteDialog from "./components/inviteDialog.vue";
import editDialog from "./components/editDialog.vue";
import peopleRules from "./components/peopleRules.vue";
import peopleTable from "./components/peopleTable.vue";
const inviteDialogRef = ref<InstanceType<typeof inviteDialog>>();
const editDialogRef = ref<InstanceType<typeof editDialog>>();

const showInviteDialog = () => {
  inviteDialogRef.value?.controllDialog(true);
};

const showEditDialog = () => {
  editDialogRef.value?.controllDialog(true);
};
</script>

<style scoped lang="less">
@import "../../public.less";
.content-people-container {
  width: 100%;
}
</style>
