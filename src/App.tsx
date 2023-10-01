import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./core/i18n.tsx";
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
