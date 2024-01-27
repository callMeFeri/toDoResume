import {
  createContext,
  useReducer,
  useContext,
  useEffect,
} from "react";
import { reducer } from "./context-reducer";
import { useTranslation } from "react-i18next";



// type child = {
//   children: ReactNode;
// };
const loadingInfo = JSON.parse(localStorage.getItem("tasks") );

const loader = (section) => {
  if (loadingInfo) {
    if (section === "boards") {
      console.log("hi");

      return loadingInfo.boards;
    }
    if (section === "tasks") {
      return loadingInfo.task;
    }
  }
  if (section === "boards") {
    return [];
  }
  if (section === "tasks") {
    return [];
  }
};
export const AppContext = createContext();
let initialState = {
  language: localStorage.getItem("language") || "pe",
  showSideBar: true,
  boards: loader("boards"),
  component: "/",
  task: loader("tasks"),
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { i18n } = useTranslation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const saveLocal = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { language, showSideBar, ...newState } = state;
    return newState;
  };
  useEffect(() => {
    i18n.changeLanguage(state.language);
    localStorage.setItem("language", state.language);
    document.body.dataset.direction = state.language === "pe" ? "rtl" : "ltr";
    document.body.dataset.sidebarPosition =
      state.language === "pe" ? "right" : "left";
  }, [i18n, state.language]);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(saveLocal()));
  }, [saveLocal, state]);
  const changeLanguage = (language) => {
    dispatch({ type: "CHANGE-LANGUAGE", language: language });
  };
  const showSideBar = () => {
    dispatch({ type: "SHOW-SIDEBAR" });
  };
  const addTask = ({
    content,
    category,
  }) => {
    dispatch({ type: "ADD_TASK", content: content, category: category });
  };
  const remove = (id) => {
    dispatch({ type: "REMOVE", id: id });
  };
  const removeBoard = (idBoard) => {
    dispatch({ type: "REMOVE-BOARD", id: idBoard });
  };
  const edit = (id) => {
    dispatch({ type: "EDIT", id: id });
  };
  const editDone = ({ id, content }) => {
    dispatch({ type: "EDIT-DONE", id: id, content: content });
  };
  const clean = () => {
    dispatch({ type: "CLEAN" });
  };
  const changePlace = ({ id, type }) => {
    dispatch({ type: "CHANGE-PLACE", id: id, newType: type });
  };
  const changeComponent = (cmp) => {
    dispatch({ type: "CHANGE-COMPONENT", add: cmp });
  };
  const addBoard = (text) => {
    dispatch({ type: "ADD-BOARD", text: text });
  };
  const handleCheck = ({ status, id }) => {
    dispatch({ type: "CHECKED", status: status, id: id });
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
        handleCheck,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
  return useContext(AppContext);
};
