import { useGlobalContext } from "../../context/context-state";
import { useTranslation } from "react-i18next";
import { formStyle } from "./forms/taskForm";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import { TaskForm } from "./forms/taskForm";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

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
              <TextField
                fullWidth
                label={t("tasks.taskLabel")}
                name="board"
                inputProps={{ inputProps: { dir: "rtl" } }}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  "& > *": {
                    m: 1,
                  },
                }}
              >
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  type="submit"
                >
                  {t("tasks.addTask")}
                </Button>
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
