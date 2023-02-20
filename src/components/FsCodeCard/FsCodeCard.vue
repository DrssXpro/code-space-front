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
      <div class="content-info">
        <img src="@/assets/image/JS.jpg" class="lan-img" alt="" />
        <div>JavaScript</div>
        <div><i class="fa fa-eye"></i> 220 浏览</div>
        <div>306.00 bytes</div>
      </div>
    </div>
    <div class="fs-code-card_footer">
      <ul>
        <li><span>2023-02-16 10:41</span></li>
        <li>
          <div class="operator-btn">
            <i class="fa fa-thumbs-o-up"></i>
            <span style="margin-left: 10px">0</span>
          </div>
        </li>
        <li>
          <div class="operator-btn">
            <i class="fa fa-star-o"></i>
            <span style="margin-left: 10px">0</span>
          </div>
        </li>
        <li>
          <div class="operator-btn">
            <i class="fa fa-commenting-o"></i>
            <span style="margin-left: 10px">0</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="fs-code-card_tag">私密</div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.fs-code-card {
  position: relative;
  padding: 20px;
  background-color: var(--main-color);
  transition: all 0.3s;
  border-radius: 10px;
  overflow: hidden;
  &_header {
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .person-info {
      margin-left: 10px;
    }
  }
  &_content {
    width: 700px;
    cursor: pointer;
    .content-title {
      font-size: 18px;
      margin: 10px 0;
      color: var(--font-main-color);
    }

    .content-preview {
      margin: 10px 0;
      &:hover {
        color: var(--font-main-color);
      }
    }
    .content-info {
      display: flex;
      font-size: 12px;
      gap: 10px;
      .lan-img {
        width: 18px;
        height: 18px;
      }

      :nth-child(2) {
        padding-right: 10px;
        border-right: 1px solid var(--font-color);
      }
      :nth-child(3) {
        padding-right: 10px;
        border-right: 1px solid var(--font-color);
      }
    }
  }
  &_footer {
    font-size: 14px;
    margin-top: 10px;
    ul {
      display: flex;
      align-items: center;
      gap: 10px;
      color: var(--font-main-color);
      li {
        position: relative;
      }
      .line-gap {
        position: absolute;
        content: "";
        width: 1px;
        height: 70%;
        right: -2px;
        top: 5px;
        background-color: var(--font-color);
      }
      & > li:nth-child(2)::after {
        .line-gap();
      }
      & > li:nth-child(3)::after {
        .line-gap();
      }
    }
    .operator-btn {
      padding: 4px 12px;
      display: flex;
      align-items: center;
      cursor: pointer;
      border-radius: 5px;
      transition: all 0.3s;
      color: var(--font-color);
      &:hover {
        color: var(--font-main-color);
      }
    }
  }
  &_tag {
    position: absolute;
    width: 120px;
    height: 30px;
    right: -30px;
    top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotate(40deg);
    color: var(--font-active-color);
    background-color: var(--choose-color);
  }

  .line-one {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
