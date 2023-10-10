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
                  label={t("tasks.taskLabel")}
                  name="board"
                  style={{ paddingRight: 2, paddingLeft: 2 }}
                />
                <Fab
                  size="medium"
                  color="secondary"
                  aria-label="add"
                  type="submit"
                >
                  <AddIcon>{t("tasks.addTask")}</AddIcon>
                </Fab>
              </Box>
            </form>
          </div>
        </div>
      </div>
      <div>
        <ol>
          {state.boards
            ? state.boards.map((board: string) => {
                const { title, id }: { title: string; id: string } = board;
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
