import { createBrowserRouter } from "react-router-dom";
import { LogIn } from "./feature/identity/components/login/login";
import Register from "./feature/identity/components/register/register";
import { LayOut } from "./layout/layout-identity";
import { registerAction } from "./feature/identity/components/register/register";
import { logInAction } from "./feature/identity/components/login/login";
import { MainLayout } from "./layout/mainLayout";
import { ToDo } from "./feature/todos/todo";
import { Boards } from "./feature/todos/boards";
import { NotFound } from "./notFound";
const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            element: <ToDo />,
            index: true,
          },
        ],
      },
      {
        element: <LayOut />,
        children: [
          {
            path: "/register",
            element: <Register />,
            action: registerAction,
            errorElement: <Register />,
          },
          {
            path: "/login",
            element: <LogIn />,
            errorElement: <LogIn />,
            action: logInAction,
          },
        ],
      },
      {
        element: <MainLayout />,
        children: [
          {
            path: "/boards",
            element: <Boards />,
            errorElement: <Boards />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
          {
            path: "/tasks",
            element: <ToDo />,
          },
        ],
      },
    ],
  },
]);
export default router;
