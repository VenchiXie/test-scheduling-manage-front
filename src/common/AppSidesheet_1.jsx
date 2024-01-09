import { useEffect, useState } from "react";

/**
 * @description 滑动侧边栏，默认侧边栏从右滑出，支持点击遮罩区关闭。
 * @param {Object} param0
 * @param {boolean} [param0.visible=false] 显示或隐藏元素，默认false。
 * @param {*} param0.setVisible
 * @param {*} param0.title    侧边栏标题,默认“”。
 * @param {*} param0.position 设置侧边栏滑出位置，支持 top, bottom, left, right（默认）。
 * @param {*} param0.mask     当 mask={false}时允许对外部区域进行操作。
 * @param {*} param0.children 子元素
 *  */
function AppSidesheet_1({ visible = false, setVisible, title, position, mask = true, children }) {
  // 设置侧边栏滑出位置
  const positionLocalStorage = localStorage.getItem("app-sidesheet-position") ? "position-right" : "";
  const [positionValue, setPositionValue] = useState(positionLocalStorage);
  useEffect(() => {
    switch (position) {
      case "left":
        setPositionValue("position-left");
        break;
      case "right":
        setPositionValue("position-right");
        break;
      case "top":
        setPositionValue("position-top");
        break;
      case "bottom":
        setPositionValue("position-bottom");
        break;
    }
    localStorage.setItem("app-sidesheet-position", positionValue);
  }, [positionValue]);

  return (
    <aside style={{ visibility: visible ? " visible" : "hidden" }} className={`app-sidesheet_1`}>
      <div className={`app-sidesheet-mask ${!mask ? "hidden" : ""}`} onClick={() => setVisible(false)}></div>
      <div className={`app-sidesheet_1-container ${positionValue}`}>
        <header className="app-sidesheet_1-header">
          <h3>{title}</h3>
          <span onClick={() => setVisible(false)}>❌</span>
        </header>
        <div className="app-sidesheet_1-content">{children}</div>
      </div>
    </aside>
  );
}

export default AppSidesheet_1;
