<template>
  <el-card>
    <template #header>文件上传</template>
    <div class="file-content">
      <div class="file-desc">此次课题的实践报告</div>
      <div class="file-upload">
        <el-upload class="upload-demo" drag action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15">
          <i class="fa fa-cloud-upload icon"></i>
          <div class="el-upload__text">拖动文件或者<em>点击上传</em></div>
          <template #tip>
            <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
          </template>
        </el-upload>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.file-content {
  padding: 20px;
  .file-desc {
    margin-bottom: 20px;
  }
  .icon {
    font-size: 30px;
    margin-bottom: 10px;
  }
}
</style>
