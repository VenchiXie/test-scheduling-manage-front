import { Fragment, useState } from "react";

import AppPopup from "../common/AppPopup.jsx";
import AppInput from "../common/AppInput.jsx";

import { openDatabase, addDataStorageDatabase, getAllDatabases } from "../db/indexDB.js";

import bg from "../assets/logo192.png";


function AppWelcomeView({ setIsWorkspace }) {
  // 工作簿（数据库名）
  const [database, setDatabase] = useState("");
  // 工作表（仓库）
  const [store, setStore] = useState("");
  // 提示错误信息
  const [error, setError] = useState("");

  /**
   * @description 创建数据库
   *  */
  const handleCreateDatabase = async () => {
    try {
      // database and store 禁止为空
      if (database === "" && store === "") throw new String("请创建工作簿和工作表");

      // database禁止为空
      if (database === "") throw new String("请创建工作簿");

      // store禁止为空
      if (store.length === 0) throw new String("请创建工作表");

      // 将非法字符拦截
      if (store.match(/null|undefined|\s|\\|\W/gi)) throw new String("非法字符，请使用数字、字符、下划线'_'。");

      // 将非法字符拦截
      if (database.match(/null|undefined|\s|\\|\W/gi)) throw new String("非法字符，请使用数字、字符、下划线'_'。");

      // 调用数据库
      await openDatabase(database, store);
      // 关闭弹窗
      handleClosePopup();
      // 跳转到工作区
      setIsWorkspace(true);
    } catch (error) {
      setError(error);
    }
  };

  // 打开弹窗
  const handleOpenPopup = () => {
    const popup = document.querySelector(".app-popup");
    const popupContainer = document.querySelector(".app-popup-container");

    popup.classList.toggle("active");
    popupContainer.classList.toggle("active");
    document.body.style.overflow = "hidden";
  };

  // 关闭弹窗
  const handleClosePopup = () => {
    const popup = document.querySelector(".app-popup");
    const popupContainer = document.querySelector(".app-popup-container");

    popup.classList.toggle("active");
    popupContainer.classList.toggle("active");
    document.body.style.overflowY = "scroll";
  };

  return (
    <Fragment>
      <main className="app-welcomeview">
        <section className="app-welcomeview-content">
          <img className="app-welcomeview-bg" alt="" src={bg} />
          <div>欢迎使用 Test Scheduling 管理工具</div>
          <p>在这里，您可以使用该工具尝试创建一个工作区。</p>
          <div className="app-welcomeview-creatework" onClick={handleOpenPopup}>
            创建工作区
          </div>
        </section>
      </main>
      {/* 使用弹窗 */}
      <AppPopup width="500px">
        <article className="app-welcomeview-form">
          <div>
            <AppInput
              title="工作簿"
              id="database"
              value={database}
              onChange={(e) => setDatabase(e.target.value)}
              error={error}></AppInput>
          </div>
          <div>
            <AppInput
              title="工作表"
              id="store"
              value={store}
              onChange={(e) => setStore(e.target.value)}
              error={error}></AppInput>
          </div>
          <div className="app-welcomeview-creatework" onClick={handleCreateDatabase}>
            创建
          </div>
        </article>
      </AppPopup>
    </Fragment>
  );
}

export default AppWelcomeView;
