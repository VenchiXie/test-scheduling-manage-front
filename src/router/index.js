import { lazy } from "react";
import { createBrowserRouter, createHashRouter } from "react-router-dom";

const App = lazy(() => import("../App.js"));
const AppHomeView = lazy(() => import("../views/AppHomeView.jsx"));
const AppTableView = lazy(() => import("../views/AppTableView.jsx"));
const Test = lazy(() => import("../views/Test.jsx"));
const ErrorPage = lazy(() => import("../views/ErrorPage.jsx"));
const router = createHashRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          index: true, // 默认显示子级路由
          element: <AppHomeView></AppHomeView>,
        },
        {
          path: "app-test",
          element: <Test></Test>,
        },
      ],
    },
    {
      path: "app-tables/:database/:version",
      element: <AppTableView></AppTableView>,
    },
  ],
  { basename: "/" }
);

export default router;
