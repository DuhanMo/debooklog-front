import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';  // ✅ index.css 전역 스타일 적용

/**
 * React 애플리케이션을 DOM에 렌더링
 */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <App/>
);
