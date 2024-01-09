import { createRoot } from "react-dom/client";
import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";

import router from "./router/index.js";

import "./styles/app.css";
import "./styles/index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <Suspense fallback={<div>loading...</div>}>
    <RouterProvider router={router}></RouterProvider>
  </Suspense>
);
