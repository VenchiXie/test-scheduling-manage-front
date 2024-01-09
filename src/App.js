import { Fragment, useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";

import AppHeader from "./common/AppHeader.jsx";
import AppWelcomeView from "./views/AppWelcomeView.jsx";

import responsiveLayout from "./utils/responsiveLayout.js";
import debounce from "./utils/debounce.js";

function App() {
  // 主题
  const [theme, setTheme] = useState(() => localStorage.getItem("theme-mode") || "dark");
  useEffect(() => {
    document.body.setAttribute("theme-mode", theme);
    localStorage.setItem("theme-mode", theme);
  }, [theme]);

  /**
   * @description 侧边栏伸缩
   *  */
  const handleToggleSidesheet = () => {
    const currentWindowWidth = document.documentElement.clientWidth;
    const appSidesheet = document.querySelector(".app-aside");
    const appMain = document.querySelector(".app-main");
    const appAsideNavlinks = document.querySelectorAll(".app-aside-navlink");
    // 当屏幕 <= 768 时，去掉侧边栏与内容区域的“margin-left”。
    if (currentWindowWidth <= 768) {
      appSidesheet.classList.toggle("active-mobile");
      appMain.classList.toggle("active-mobile");
      // 区域所有a标签下的 span[0]、span[1] 设置其样式。
      for (let i = 0; i < appAsideNavlinks.length; i++) {
        appAsideNavlinks[i].childNodes.item(0).classList.remove("active");
        appAsideNavlinks[i].childNodes.item(1).classList.remove("active");
      }
    } else {
      appSidesheet.classList.toggle("active");
      appMain.classList.toggle("active");
      // 区域所有a标签下的 span[0]、span[1] 设置其样式。
      for (let i = 0; i < appAsideNavlinks.length; i++) {
        appAsideNavlinks[i].childNodes.item(0).classList.toggle("active");
        appAsideNavlinks[i].childNodes.item(1).classList.toggle("active");
      }
    }
  };

  useEffect(() => {
    const rsize = () => {
      const currentWindowWidth = document.documentElement.clientWidth;
      const appSidesheet = document.querySelector(".app-aside");
      const appMain = document.querySelector(".app-main");
      if (currentWindowWidth <= 768) {
        appSidesheet.classList.remove("active");
        appMain.classList.remove("active");
      }
    };
    window.addEventListener("resize", debounce(rsize, 200));
    return () => {
      window.removeEventListener("resize", debounce(rsize, 200));
    };
  });

  // 调用响应式布局,初始渲染时执行一次
  useEffect(() => {
    responsiveLayout();
    window.addEventListener("resize", debounce(responsiveLayout, 200));
    return () => {
      window.removeEventListener("resize", debounce(responsiveLayout, 200));
    };
  }, []); // 判断是否在工作区

  const [isWorkspace, setIsWorkspace] = useState(() => {
    const state = localStorage.getItem("isWorkspace");
    return state !== null ? JSON.parse(state) : false;
  });

  useEffect(() => {
    localStorage.setItem("isWorkspace", JSON.stringify(isWorkspace));
  }, [isWorkspace]);

  const nav = [
    { key: 1, text: "Home", to: "/" },
    { key: 2, text: "测试", to: "/app-test" },
  ];

  if (!isWorkspace) {
    return <AppWelcomeView setIsWorkspace={setIsWorkspace}></AppWelcomeView>;
  }
  return (
    <Fragment>
      {/* 侧边栏 */}
      <aside className="app-aside">
        <header className="app-aside-header">
          <span onClick={handleToggleSidesheet}>✖</span>
        </header>
        <nav className="app-aside-content">
          {nav.map((item) => (
            <NavLink
              className={`app-aside-navlink ${({ isActive }) => (isActive ? "active" : "")}`}
              key={item.key}
              to={item.to}>
              <span className="app-aside-span-logo">
                {typeof item.text === "string" && item.text.slice(0, 1).toLocaleUpperCase()}
              </span>
              <span className="app-aside-span-text">{item.text}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="app-main">
        <AppHeader>
          <article className="app-header-left">
            <div className="app-header-asidebutton" onClick={handleToggleSidesheet}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </article>
          <article className="app-header-right">
            <div onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? "白" : "夜"}</div>
          </article>
        </AppHeader>

        <section className="app-content">
          <Outlet></Outlet>
        </section>
        <footer className="app-footer">footer</footer>
      </main>
    </Fragment>
  );
}

export default App;
