/**
 * @description 弹窗组件
 * @param {Object} param0
 * @param {*} param0.popupTitle 弹窗标题
 * @param {*} param0.style 宽度，默认是80%。单位：%
 * @param {*} param0.children 子元素
 * */
function AppPopup({ children }) {
  // 关闭弹窗
  const handleClosePopup = () => {
    const popup = document.querySelector(".app-popup");
    const popupContainer = document.querySelector(".app-popup-container");
    popup.classList.toggle("active");
    popupContainer.classList.toggle("active");
    document.body.style.overflowY = "scroll";
  };

  return (
    <main className="app-popup">
      <section className="app-popup-container">
        <span className="app-popup-close" onClick={handleClosePopup}>
          ✖︎
        </span>
        <section className="app-popup-content">{children}</section>
      </section>
    </main>
  );
}

export default AppPopup;
