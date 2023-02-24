<template>
  <div class="fs-comment-card">
    <div class="fs-comment-card_header">
      <img src="@/assets/image/avatar.jpg" alt="" />
      <div class="user-info">
        <span>_Async__</span>
        <el-tag effect="danger">空间主</el-tag>
      </div>
    </div>
    <div class="fs-comment-card_content">
      <div v-html="content"></div>
    </div>
    <div class="fs-comment-card_footer">
      <div>2023-02-24 14:13</div>
      <el-button type="info" text @click="showReplay = !showReplay">
        <i class="fa fa fa-thumbs-o-up"></i> <span style="margin-left: 5px">100</span></el-button
      >
      <el-button type="danger" text @click="showReplay = !showReplay">回复</el-button>
    </div>
    <div class="fs-comment-card_child">
      <div class="child-header">
        <img src="@/assets/image/avatar.jpg" alt="" />
        <div class="user-info">
          <span>_Async__</span>
          <el-tag effect="danger">空间主</el-tag>
        </div>
      </div>
      <div class="child-content">
        session、 video、 audio、 worker、 canvas、SVG requestAnimationFrame、 history、 file Reader、 Full Screen、
        Page Visibility、 getUserMedia API、Battery API、Link
        Prefetching、orientationchange、navigator.vibrate、navigator.language 、navigator.onLine、contentEditable
        、window.onblur & window.onfocus、loaction
      </div>
      <div class="child-footer">
        <div>2023-02-24 14:13</div>
        <el-button type="info" text @click="showReplay = !showReplay">
          <i class="fa fa fa-thumbs-o-up"></i> <span style="margin-left: 5px">100</span></el-button
        >
        <el-button type="danger" text @click="showReplay = !showReplay">回复</el-button>
      </div>
    </div>
    <div class="fs-comment-card_replay" v-show="showReplay">
      <el-input
        v-model="replayContent"
        type="textarea"
        placeholder="回复 @_Async__"
        maxlength="120"
        show-word-limit
        :autosize="{ minRows: 6 }"
      ></el-input>
      <el-button
        type="primary"
        style="width: 120px; border-radius: 0; margin-top: 20px"
        @click="showReplay = !showReplay"
        >回复</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const showReplay = ref(false);
const content = ref(
  "<p> <strong>1.DOM（Document Object Model）: 文档对象模型</strong></p><p>获取过来的DOM元素是一个对象（object），所以称为文档对象模型</p><p>是W3C组织推荐的处理可扩展标记语言（HTML或者XML）的标准编程接口</p><p>W3C已经定义了一系列的DOM接口，通过这些DOM接口可以改变网页的内容、结构和样式 </p><p></p><p>1.对于JavaScript，为了能够使JavaScript操作HTML，JavaScript就有自己的dom编程接口</p><p>2.对于HTML，dom使得html形成一棵dom树，包含文档、元素、节点</p><p></p><p>关于dom操作，我们主要针对元素操作。主要有创建、增、删、改、查、属性操作、事件操作</p><p></p><p><strong>2.BOM（Browser Object Model）: 浏览器对象模型</strong></p><p>提供了独立于内容而与浏览器窗口进行交互效果（特别理解一下此处的加粗字体）</p><p></p><p>核心对象：window</p>"
);
const replayContent = ref("");
</script>

<style scoped lang="less">
.comment-header {
  display: flex;
  align-items: center;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .user-info {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: 20px;
  }
}
.comment-footer {
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--el-text-color-secondary);
}
.fs-comment-card {
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--el-card-border-color);
  &_header {
    .comment-header();
  }

  &_content {
    margin: 20px 0;
  }
  &_footer {
    .comment-footer();
  }
  &_child {
    margin-left: 40px;
    margin-top: 20px;
    .child-header {
      .comment-header();
    }
    .child-content {
      margin: 10px 0;
      font-size: 18px;
    }
    .child-footer {
      .comment-footer();
    }
  }
  &_replay {
    margin-left: 50px;
    margin-top: 20px;
    text-align: end;
  }
}
</style>
