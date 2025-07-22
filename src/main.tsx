import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router";

import App from "@/App";
import ScrollToTop from "@/components/ScrollToTop";
import "./i18n";

import "./styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <HashRouter basename="/">
    <ScrollToTop />
    <App />
  </HashRouter>,
);
