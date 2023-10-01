import { useLocation } from "react-router";
import { Boards } from "../feature/todos/boards";
import { ToDo } from "../feature/todos/todo";
import { InitPage } from "../feature/todos/initPage";
export const NavPage = () => {
  const l = useLocation().pathname;
  if (l === "/boards") {
    return <Boards />;
  }
  if (l === "/") {
    return <InitPage />;
  }
  if (l === "/tasks") {
    return <ToDo />;
  }
};
