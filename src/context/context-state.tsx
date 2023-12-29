export type GlobalContextType = {
  state: initState;
  changeLanguage: (language: "pe" | "en") => void;
  showSideBar: () => void | unknown;
  addBoard: (text: string) => void | unknown;
  clean: () => void | unknown;
  edit: (id: string) => void | unknown;
  remove: (id: string) => void | unknown;
  addTask: (data: { content: string; category: string }) => void | unknown;
  editDone: (data: { id: string; content: string }) => void | unknown;
  changeComponent: (cmp: string) => void | unknown;
  removeBoard: (idBoard: string) => void | unknown;
  changePlace: (data: { id: string; type: string }) => void | unknown;
  handleCheck: (data: { status: boolean; id: string }) => void | unknown;
};

type initState = {
  language: string;
  showSideBar: boolean;
  boards: string[];
  component: string;
  coloumns?: string[];
  task: []; // category: string;
  // content: string;
  // isEditing: boolean;
  // id: string;];
};
