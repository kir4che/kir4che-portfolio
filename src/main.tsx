import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";

import App from "@/App";
import ScrollToTop from "@/components/ScrollToTop";
import "./i18n";

import "./styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <ScrollToTop />
    <App />
  </BrowserRouter>,
);
