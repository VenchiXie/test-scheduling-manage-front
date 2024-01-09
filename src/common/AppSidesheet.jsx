import { useEffect, useState } from "react";

/**
 * @description 滑动侧边栏，默认侧边栏从右滑出，支持点击遮罩区关闭。
 * @param {Object} param0
 * @param {boolean} [param0.visible=false]    显示或隐藏元素，默认false。
 * @param {*} param0.setVisible
 * @param {*} param0.title                    侧边栏标题,默认“”。
 * @param {string} [param0.position="right"]  设置侧边栏滑出位置，支持 top, bottom, left, right（默认）。
 * @param {boolean} [param0.mask=true]        当 mask={false}时允许对外部区域进行操作。
 * @param {*} param0.children                 子元素
 *  */
function AppSidesheet({ visible = false, setVisible, title, position = "right", mask = true, children }) {
  // 设置侧边栏滑出位置
  const [positionValue, setPositionValue] = useState("position-right");
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
  }, [positionValue]);

  //根据遮罩改变风格
  const [appSidesheetStyle, setAppSidesheetStyle] = useState("");
  useEffect(() => {
    if (!mask) { 
      switch (position) {
        case "left":
          setAppSidesheetStyle("position-left-removemask");
          break;
        case "right":
          setAppSidesheetStyle("position-right-removemask");
          break;
        case "top":
          setAppSidesheetStyle("position-top-removemask");
          break;
        case "bottom":
          setAppSidesheetStyle("position-bottom-removemask");
          break;
      }
    }
  }, [mask, appSidesheetStyle]);

  useEffect(() => {
    visible && mask ? (document.body.style.overflow = "hidden") : (document.body.style.overflow = "auto");
  }, [visible]);

  return (
    <aside style={{ visibility: visible ? " visible" : "hidden" }} className={`app-sidesheet ${positionValue} ${appSidesheetStyle}`}>
      <div className={`app-sidesheet-mask ${!mask ? "hidden" : "block"}`} onClick={() => setVisible(false)}></div>
      <div className={`app-sidesheet-container ${positionValue}`}>
        <header className="app-sidesheet-header">
          <h3>{title}</h3> <span onClick={() => setVisible(false)}>❌</span>
        </header>
        <div className="app-sidesheet-content">{children}</div>
      </div>
    </aside>
  );
}

export default AppSidesheet;

