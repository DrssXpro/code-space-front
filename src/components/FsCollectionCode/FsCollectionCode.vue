<template>
  <div class="fs-collection-code">
    <div class="fs-collection-code_header">
      <div class="left">
        <img src="@/assets/image/avatar.jpg" alt="" />
        <div class="code-info">
          <div style="font-size: 18px">二分查找</div>
          <div class="user-info">
            <i class="fa fa-user-circle-o"></i>
            <span>_Async__</span>
          </div>
        </div>
      </div>
      <div class="right">
        <el-button type="success" text>查看详情</el-button>
        <el-button type="danger" text>取消收藏</el-button>
      </div>
    </div>
    <div class="fs-collection-code_content">
      <div class="code-preview">
        {{
          `void quick_sort(int q[], int l, int r)
{
    if (l >= r) return;

    int i = l - 1, j = r + 1, x = q[l + r >> 1];
    while (i < j)
    {`
        }}
      </div>
      <div class="code-count">
        <img src="@/assets/image/JS.jpg" class="lan-img" alt="" />
        <div>JavaScript</div>
        <div><i class="fa fa-eye"></i> 220 浏览</div>
        <div>306.00 bytes</div>
      </div>
    </div>
    <div class="fs-collection-code_footer">
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
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.fs-collection-code {
  padding: 20px 10px;
  &_header {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      img {
        width: 40px;
        height: 40px;
        margin-right: 20px;
      }
      .code-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .user-info {
          color: var(--el-text-color-secondary);
          i {
            margin-right: 5px;
          }
        }
      }
    }
  }
  &_content {
    .code-count {
      margin-top: 10px;
      display: flex;
      font-size: 14px;
      gap: 10px;
      color: var(--el-text-color-secondary);
      .lan-img {
        width: 18px;
        height: 18px;
      }

      :nth-child(2) {
        padding-right: 10px;
        border-right: 1px solid var(--el-border-color-light);
      }
      :nth-child(3) {
        padding-right: 10px;
        border-right: 1px solid var(--el-border-color-light);
      }
    }
  }
  &_footer {
    margin-top: 10px;
    font-size: 14px;
    ul {
      display: flex;
      align-items: center;
      gap: 10px;
      li {
        position: relative;
        color: var(--el-text-color-secondary);
      }
      .line-gap {
        position: absolute;
        content: "";
        width: 1px;
        height: 70%;
        right: -2px;
        top: 5px;
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
      border-radius: 5px;
    }
  }
}
</style>
