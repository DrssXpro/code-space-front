<template>
  <div class="space-content">
    <div class="space-content_left">
      <div class="space-info">
        <img :src="spaceDetail?.spaceDetail.avatar" alt="" />
        <div class="space-shadow"></div>
        <div class="space-detail">
          <div class="time-info">
            <div>{{ spaceDetail?.spaceDetail.user.authorName }}</div>
            <div style="color: var(--el-text-color-secondary); font-size: 14px">
              创建{{ getDisDay(Date.now(), new Date(spaceDetail?.spaceDetail.createdAt || "").getTime()) }}天
            </div>
          </div>
          <img :src="spaceDetail?.spaceDetail.user.authorAvatar" class="author" alt="" />
        </div>
        <div class="space-introduce">
          <div class="space-title">{{ spaceDetail?.spaceDetail.name }}</div>
          <div class="introduce-detail">
            {{ spaceDetail?.spaceDetail.introduce }}
          </div>
        </div>
        <div class="space-operator">
          <div>邀请码</div>
          <el-input v-model="inviteCode" disabled class="invite-input"></el-input>
          <el-button type="info">点击复制</el-button>
        </div>
        <el-button type="danger" class="edit-btn" @click="handleEdit">编辑信息</el-button>
      </div>
    </div>
    <div class="space-content_right">
      <div class="space-count">
        <div class="count-item">
          <i class="count-icon fa fa-user"></i>
          <div class="count">{{ spaceDetail?.userCount }}</div>
          <div class="desc">所有成员</div>
        </div>
        <div class="count-item">
          <i class="count-icon fa fa-user"></i>
          <div class="count">{{ spaceDetail?.taskCount }}</div>
          <div class="desc">所有任务</div>
        </div>
        <div class="count-item">
          <i class="count-icon fa fa-user"></i>
          <div class="count">{{ spaceDetail?.codeCount }}</div>
          <div class="desc">所有代码</div>
        </div>
        <div class="count-item">
          <i class="count-icon fa fa-user"></i>
          <div class="count">100</div>
          <div class="desc">所有成员</div>
        </div>
      </div>
      <div class="code-table">
        <div class="code-title">最新代码</div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onActivated, onUnmounted, ref } from "vue";
import { getSpaceDetail } from "@/service/api/spaceRequest";
import mitter from "@/utils/mitter";
import useUserStore from "@/stores/userStore";
import type { ISpaceDetail } from "@/types/spaceType";
import { getDisDay } from "@/utils/formatTime";
const emit = defineEmits<{
  (e: "editSpaceInfo", detail: ISpaceDetail): void;
}>();

const { userInfo } = useUserStore();

const spaceDetail = ref<ISpaceDetail>();

const inviteCode = ref("");

const getSpaceDetailData = async () => {
  const res = await getSpaceDetail(userInfo?.space?.spaceId!);
  console.log(res.data);
  spaceDetail.value = res.data;
  inviteCode.value = res.data.spaceDetail.inviteCode;
};

// 监听编辑表单，修改完成后刷新信息
mitter.on("refreshInfo", () => {
  getSpaceDetailData();
});

const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];

onActivated(() => {
  getSpaceDetailData();
});

onUnmounted(() => {
  mitter.off("refreshInfo");
});

const handleEdit = () => {
  emit("editSpaceInfo", spaceDetail.value!);
};
</script>

<style scoped lang="less">
.space-content {
  display: flex;
  width: 100%;
  height: 100%;
  gap: 20px;
  &_left {
    width: 300px;
    .space-info {
      position: relative;
      background-color: var(--el-bg-color-overlay);
      border-radius: 20px;
      overflow: hidden;
      img {
        width: 100%;
        height: 150px;
      }
      .space-shadow {
        position: absolute;
        top: 80px;
        left: 0;
        width: 100%;
        height: 70px;
        background-image: linear-gradient(-180deg, rgba(0, 0, 0, 0) 4%, rgba(0, 0, 0, 0.6) 98%);
      }
      .space-detail {
        position: absolute;
        left: 25px;
        top: 120px;
        width: 250px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .time-info {
          display: flex;
          flex-direction: column;
          height: 60px;
          align-items: center;
          justify-content: space-around;
        }
        .author {
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }
      }
      .space-introduce {
        margin-top: 40px;
        padding: 0 20px;
        .space-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .introduce-detail {
          margin-top: 10px;
          letter-spacing: 0.1em;
          line-height: 1.5em;
        }
      }
      .space-operator {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 0 20px;
        margin-top: 10px;
        .invite-input {
          width: 100px;
        }
      }
      .edit-btn {
        width: 250px;
        margin: 20px 0 20px 25px;
      }
    }
  }
  &_right {
    flex: 1;
    height: calc(100vh - 110px);
    margin-right: 20px;
    .space-count {
      display: flex;
      align-items: center;
      gap: 20px;

      .count-item {
        flex: 1;
        border-radius: 10px;
        background-color: var(--el-bg-color-overlay);
        padding: 30px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        .count-icon {
          font-size: 30px;
        }
        .count {
          font-size: 25px;
          font-weight: 700;
        }
        .desc {
          color: var(--el-text-color-secondary);
        }
      }
    }
    .code-table {
      margin-top: 20px;
      background-color: var(--el-bg-color-overlay);
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      padding: 20px;
      .code-title {
        margin-bottom: 20px;
        font-size: 22px;
      }
    }
  }
}
</style>
