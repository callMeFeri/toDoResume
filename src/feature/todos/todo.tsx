import { useGlobalContext } from "../../context/context-state";
import { useTranslation } from "react-i18next";
import { formStyle } from "./forms/taskForm";
import TextField from "@mui/material/TextField";
import { TaskForm } from "./forms/taskForm";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
export const ToDo = () => {
  const { state, addBoard } = useGlobalContext();
  const { t } = useTranslation();
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="m-sm-4">
            <form
              style={formStyle}
              onSubmit={(e) => {
                addBoard(e.target.board.value);
                e.preventDefault();
                e.target.board.value = "";
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  "& > *": {
                    m: 1,
                  },
                }}
              >
                <TextField
                  fullWidth
                  label={t("tasks.addBoard")}
                  variant="standard"
                  name="board"
                  style={{ paddingRight: 2, paddingLeft: 2 }}
                />
                <Fab
                  size="large"
                  color="secondary"
                  aria-label="add"
                  type="submit"
                  sx={{
                    background: "blue",
                  }}
                >
                  <AddIcon />
                </Fab>
              </Box>
            </form>
          </div>
        </div>
      </div>
      <div>
        <ol>
          {state.boards
            ? state.boards.map((board: { title: string; id: string }) => {
                const { title, id } = board;
                return (
                  <div>
                    <hr />
                    <li>
                      <h3>{title}</h3>
                      <TaskForm board={title} idBoard={id} />
                    </li>
                  </div>
                );
              })
            : ""}
        </ol>
      </div>
    </>
  );
};
