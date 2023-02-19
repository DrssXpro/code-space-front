<template>
  <div class="fs-code-card">
    <div class="fs-code-card_header">
      <!-- <fs-image src=""></fs-image> -->
      <img src="@/assets/image/avatar.jpg" alt="" />
      <div class="person-info">
        <span>_Async__</span>
      </div>
    </div>
    <div class="fs-code-card_content">
      <div class="content-title line-one">这里是一段代码</div>
      <div class="content-preview line-one">int main (){int a = 10; int b = 100; printf('%d', a + b); return 0;}</div>
      <div class="content-tag">
        <el-tag type="info" effect="light" class="tag-item">测试测试</el-tag>
        <el-tag type="info" effect="light" class="tag-item">测试测试</el-tag>
        <el-tag type="info" effect="light" class="tag-item">测试测试</el-tag>
      </div>
    </div>
    <div class="fs-code-card_footer">
      <ul>
        <li><span>2023-02-16 10:41</span></li>
        <li>
          <el-button color="#fff" text>
            <i class="fa fa-thumbs-o-up"></i>
            <span style="margin-left: 10px">0</span>
          </el-button>
        </li>
        <li>
          <el-button color="#fff" text>
            <i class="fa fa-star-o"></i>
            <span style="margin-left: 10px">0</span>
          </el-button>
        </li>
        <li>
          <el-button color="#fff" text>
            <i class="fa fa-commenting-o"></i>
            <span style="margin-left: 10px">0</span>
          </el-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// import FsImage from "@/components/public/FsImage/FsImage.vue";
</script>

<style scoped lang="less">
.fs-code-card {
  padding: 20px;
  height: 200px;
  background-color: var(--main-color);
  transition: all 0.3s;
  border-radius: 5px;
  &_header {
    display: flex;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .person-info {
      margin-left: 10px;
      font-size: 18px;
    }
  }
  &_content {
    width: 500px;
    .content-title {
      font-size: 20px;
      margin: 10px 0;
      color: var(--font-main-color);
    }

    .content-preview {
      font-size: 18px;
      margin: 10px 0;
    }
    .content-tag {
      display: flex;
      gap: 10px;
      margin: 10px 0;
    }
  }
  &_footer {
    ul {
      display: flex;
      align-items: center;
      gap: 20px;
      color: var(--font-active-color);
    }
  }

  .line-one {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
}
</style>
