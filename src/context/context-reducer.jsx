
export const reducer = (state, action) => {
  if (action.type === "CHANGE-LANGUAGE") {
    return { ...state, language: action.language };
  }

  if (action.type === "SHOW-SIDEBAR") {
    return { ...state, showSideBar: !state.showSideBar };
  }

  if (action.type === "CHANGE-COMPONENT") {
    console.log(action.add);

    return { ...state, component: action.add };
  }

  if (action.type === "ADD-BOARD") {
    let newBoard = { title: action.text, id: new Date().getTime().toString() };
    return { ...state, boards: [...state.boards, newBoard] };
  }

  if (action.type === "ADD_TASK") {
    let newItem = {
      category: action.category,
      id: new Date().getTime().toString(),
      content: action.content,
      isEditing: false,
      isChecked: false,
    };

    return {
      ...state,
      task: [...state.task, newItem],
    };
  }

  if (action.type === "CLEAN") {
    return { ...state, task: [], boards: [] };
  }

  if (action.type === "EDIT") {
    const selectedItem = state.task.find((item) => item.id === action.id);
    selectedItem.isEditing = true;
    return { ...state };
  }
  if (action.type === "EDIT-DONE") {
    console.log(action.id);

    state.task.map((item) => {
      if (item.id === action.id) {
        item.content = action.content;
        item.isEditing = false;
        console.log(item.id);
      }
    });
    return { ...state };
  }

  if (action.type === "REMOVE") {
    return {
      ...state,
      task: state.task.filter((item) => item.id !== action.id),
    };
  }
  if (action.type === "REMOVE-BOARD") {
    console.log(action.id);

    return {
      ...state,
      boards: state.boards.filter((board) => board.id !== action.id),
    };
  }
  if (action.type === "CHANGE-PLACE") {
    state.task.map((item) => {
      if (item.id === action.id) {
        item.category = action.newType;
      }
    });
    return { ...state };
  }
  if (action.type === "CHECKED") {
    const selectedItem = state.task.find((item) => item.id === action.id);
    console.log(selectedItem);

    selectedItem.isChecked = action.status;
    return { ...state };
  }
};
