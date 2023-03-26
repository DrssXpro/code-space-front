<template>
  <div class="nav-footer_container">
    <div class="top-content">
      <div class="left">
        <div class="title">友情链接</div>
        <ul>
          <li>
            <span> <i class="fa fa-chain"></i></span>
            <a href="https://www.fasyncsy.com.cn/" target="_blank">个人博客</a>
          </li>
        </ul>
      </div>
      <div class="right">
        <div class="title">相关联系</div>
        <ul>
          <li>
            <span>B站</span>
            <a href="https://space.bilibili.com/18125345" target="_blank">@_Async__</a>
          </li>
          <li>
            <span>邮箱</span>
            <a href="#" target="_blank" onclick="return false;">1827951482@qq.com</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="foot-content">
      <div class="foot-content_text">
        Copyrigth @2023 Code Space <a href="https://beian.miit.gov.cn/" _target="_blank">豫ICP备2022015682号</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.nav-footer_container {
  width: 100%;
  height: 200px;
  background-color: var(--el-bg-color-overlay);
  color: var(--el-text-color-primary);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  .top-content {
    margin-top: 20px;
    width: 50%;
    display: flex;
    justify-content: space-around;
    .title {
      width: 100px;
      text-align: center;
      font-size: 22px;
      font-weight: 700;
      padding-bottom: 10px;
      border-bottom: 3px solid var(--el-border-color-light);
    }
    li {
      margin-top: 20px;
      span {
        display: inline-block;
        width: 35px;
        margin-right: 5px;
        text-align: center;
        color: #5f8791;
      }
    }
  }
  .foot-content {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
