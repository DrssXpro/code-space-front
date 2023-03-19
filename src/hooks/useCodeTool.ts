import { EXTMAP } from "@/config/config";
import type { TLanguage } from "@/types/codeType";
import domtoimage from "dom-to-image";
import { ElMessage, ElLoading } from "element-plus";
export default function useCodeTool() {
  // 下载代码
  function downloadCode(title: string, codeContent: string, lan: TLanguage) {
    const blob = new Blob([codeContent]);
    const url = window.URL.createObjectURL(blob);
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.download = `${title}.${EXTMAP[lan]}`;
    aTag.click();
    aTag.remove();
    ElMessage.success("下载中，请稍等。");
  }

  // 复制代码文本
  async function copyCode(codeContent: string) {
    await navigator.clipboard.writeText(codeContent);
    ElMessage.success("复制成功");
  }

  // 代码导出为图片
  async function codeExportImage(codeNode: HTMLElement) {
    const loading = ElLoading.service({ lock: true, text: "等待中...", background: "rgba(0, 0, 0, 0.7)" });
    const imgUrl = await domtoimage.toPng(codeNode);
    const aTag = document.createElement("a");
    aTag.download = "code.png";
    aTag.href = imgUrl;
    document.body.appendChild(aTag);
    aTag.click();
    document.body.removeChild(aTag);
    loading.close();
  }

  // 分享网站链接
  async function copyCodeLink(path?: string) {
    console.log(window.location);
    const link = !path ? window.location.href : `${window.location.protocol}//${window.location.host}${path}`;
    await navigator.clipboard.writeText(link);
    ElMessage.success("链接复制成功");
  }
  return {
    downloadCode,
    copyCode,
    codeExportImage,
    copyCodeLink,
  };
}
