import {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { reducer } from "./context-reducer";
import { useTranslation } from "react-i18next";

type initState = {
  language: string;
  showSideBar: boolean;
  boards: string[];
  component: string;
  coloumns?: string[];
  task: [
    {
      // category: string;
      // content: string;
      // isEditing: boolean;
      // id: string;
    }
  ];
};

type child = {
  children: ReactNode;
};
const loader = (section: string) => {
  const loadingInfo = JSON.parse(localStorage.getItem("tasks"));
  if (!loadingInfo) {
    if (section === "boards") {
      return [];
    }
    if (section === "task") {
      return [];
    }
  }
};
export const AppContext = createContext();
const initialState: initState = {
  language: localStorage.getItem("language") || "pe",
  showSideBar: true,
  boards: loader("boards"),
  component: "/",
  task: loader("tasks"),
};

export const AppProvider = ({ children }: child) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(state.language);
    localStorage.setItem("language", state.language);
    document.body.dataset.direction = state.language === "pe" ? "rtl" : "ltr";
    document.body.dataset.sidebarPosition =
      state.language === "pe" ? "right" : "left";
  }, [state.language]);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state));
  }, [state]);
  const changeLanguage = (language: "pe" | "en") => {
    dispatch({ type: "CHANGE-LANGUAGE", language: language });
  };
  const showSideBar = (): void => {
    dispatch({ type: "SHOW-SIDEBAR" });
  };
  const addTask = ({
    content,
    category,
  }: {
    content: string;
    category: string;
  }) => {
    dispatch({ type: "ADD_TASK", content: content, category: category });
  };
  const remove = (id: string) => {
    dispatch({ type: "REMOVE", id: id });
  };
  const removeBoard = (idBoard: string) => {
    dispatch({ type: "REMOVE-BOARD", id: idBoard });
  };
  const edit = (id) => {
    dispatch({ type: "EDIT", id: id });
  };
  const editDone = ({ id, content }: { id: string; content: string }) => {
    dispatch({ type: "EDIT-DONE", id: id, content: content });
  };
  const clean = () => {
    dispatch({ type: "CLEAN" });
  };
  const changePlace = ({ id, type }: { id: string; type: string }) => {
    dispatch({ type: "CHANGE-PLACE", id: id, newType: type });
  };
  const changeComponent = (cmp: string) => {
    dispatch({ type: "CHANGE-COMPONENT", add: cmp });
  };
  const addBoard = (text) => {
    dispatch({ type: "ADD-BOARD", text: text });
  };
  return (
    <AppContext.Provider
      value={{
        state,
        changeLanguage,
        showSideBar,
        addBoard,
        clean,
        edit,
        remove,
        addTask,
        editDone,
        changeComponent,
        removeBoard,
        changePlace,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
