/**
 * @description 用于响应式设计的字体大小调整脚本，主要用于根据设备屏幕宽度动态调整页面根元素的字体大小，以实现页面在不同设备上的适配。
 *  */
export default function responsiveLayout() {
  const documentElement = document.documentElement;
  // 设计稿宽度
  // const designWidth = Number(document.querySelector('meta[name="viewport"]').getAttribute("content")) || 1200;
  const designWidth = 1200;

  // 设置最小和最大缩放比例的限制，以防止字体大小过小或过大。
  const minScale = 0.5;
  const maxScale = 2.0;

  // 获取当前窗口的宽度
  const winWidth = documentElement.clientWidth;
  // 获取设备像素密度
  const dpr = window.devicePixelRatio || 1;
  // 计算缩放比例，即当前窗口宽度与设计稿宽度的比值。
  let scale = (winWidth * dpr) / designWidth;

  // 设置最小和最大缩放比例
  scale = Math.max(minScale, Math.min(maxScale, scale));
  // 设置根元素字体大小
  documentElement.style.fontSize = 100 * scale + "px";
}
