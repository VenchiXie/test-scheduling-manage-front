import { useState } from "react";
import AppSidesheet_1 from "../common/AppSidesheet_1.jsx";
function Test(params) {
  const [visible, setVisible] = useState(false);
  return (
    <main>
      <h1>Test, React 18 with Webpack 5!</h1>
      <h2>Test, React 18 with Webpack 5!</h2>
      <h3>Test, React 18 with Webpack 5!</h3>
      <h4>Test, React 18 with Webpack 5!</h4>
      <h5>Test, React 18 with Webpack 5!</h5>
      <h6>Test, React 18 with Webpack 5!</h6>
      <p>Test, React 18 with Webpack 5!</p>
      <p>Test, React 18 with Webpack 5!</p>
      <span>Test, React 18 with Webpack 5!</span>
      <span>Test, React 18 with Webpack 5!</span>
      <br />
      <a href="">Test</a>

      <button onClick={() => setVisible(!visible)}>open sheet</button>

      <AppSidesheet_1 visible={visible} setVisible={setVisible} position={"top"}>
        <p>This is content</p>
      </AppSidesheet_1>
    </main>
  );
}

export default Test;
