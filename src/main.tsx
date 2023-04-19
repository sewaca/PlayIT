import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/css/index.css";
import "./assets/css/variables.css";
import "react-image-crop/dist/ReactCrop.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
