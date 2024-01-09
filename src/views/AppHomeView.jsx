import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllDatabases } from "../db/indexDB.js";

import coverimg from "../assets/Apple-Podcasts.jpg.square_social.jpg";

function AppHomeView() {
  const navigate = useNavigate();
  // 用于存放所有数据库名
  const [databases, setDatabases] = useState([]);

  // 初始化数据库
  useEffect(() => {
    const initialAllDatabases = async () => {
      try {
        const databases = await getAllDatabases();
        if (databases.length <= 0) return navigate("/");
        setDatabases([...databases]);
        console.log(databases);
      } catch (error) {
        console.log("err", error);
      }
    };
    initialAllDatabases();
  }, []);

  return (
    <Fragment>
      <main className="app-homeview">
        <nav className="app-homeview-nav">
          <h1>示例团队</h1>
          <article className="app-homeview-nav-rightlayout">
            <div>
              <input type="search" name="" id="" />
            </div>
            <div>导入项目</div>
            <div>新建项目</div>
          </article>
        </nav>
        {/* 主页内容宫格布局 */}
        <section className="app-homeview-content">
          {databases.map((item) => (
            <section
              className="app-grid"
              key={item.name}
              onClick={() => navigate(`/app-tables/${item.name}/${item.version}`)}>
              <article className="app-grid-on">
                <img src={coverimg} alt="" />
              </article>
              <article className="app-grid-lower">
                <div className="app-grid-lower-left">
                  <h2>{item.name.length >= 30 ? item.name.substring(0, 30) + "..." : item.name}</h2>
                  <p>2023 年 11 月 28 日</p>
                </div>
                <div className="app-grid-lower-right">
                  <span className="app-grid-show-fun">+</span>
                </div>
              </article>
            </section>
          ))}
        </section>
      </main>
    </Fragment>
  );
}

export default AppHomeView;
