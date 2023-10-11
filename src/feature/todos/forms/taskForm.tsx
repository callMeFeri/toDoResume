import {
  useGlobalContext,
  GlobalContextType,
} from "../../../context/context-state";
import { useTranslation } from "react-i18next";
import { CSSProperties } from "react";
import { useState, PropsWithChildren } from "react";
import editLogo from "../../../assets/images/edit+options+pen+pencil+tool+write+icon-1320162308955248227.svg";
import doneLogo from "../../../assets/images/checkmark+circle+complete+done+filled+ok+icon-1320184293398883601.svg";
import removeLogo from "../../../assets/images/remove+circle+24px-131985190467137446.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
export const formStyle: CSSProperties = {
  padding: 10,
  borderRadius: "0px 9px 9px 0px",
  backgroundImage:
    "linear-gradient(to right, rgba(255,0,0,0), rgba(192, 192, 192))",
};
export const TaskForm = ({
  board,
  idBoard,
}: PropsWithChildren<{ board: string; idBoard: string }>) => {
  const {
    state,
    addTask,
    edit,
    editDone,
    remove,
    removeBoard,
    changePlace,
    handleCheck,
  }: GlobalContextType = useGlobalContext();
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const divStyle: CSSProperties = {
    padding: 5,
    borderRadius: "0px 9px 9px 0px",
    backgroundImage:
      "linear-gradient(to right, rgba(255,0,0,0), rgba(200,200,200))",
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="m-sm-4">
          <form
            style={formStyle}
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              addTask({
                content: e.currentTarget.task.value,
                category: board,
              });
              e.currentTarget.task.value = "";
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                minWidth: "40px",
              }}
            >
              <TextField
                fullWidth
                label={t("tasks.taskLabel")}
                variant="standard"
                name="task"
              />
              <Fab
                size="large"
                color="secondary"
                aria-label="add"
                type="submit"
                sx={{
                  maxHeight: "50px",
                  maxWidth: "50px",
                }}
              >
                <AddIcon />
              </Fab>
              <IconButton
                aria-label="delete"
                size="large"
                onClick={() => removeBoard(idBoard)}
                sx={{ marginBottom: 2 }}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
              ,
            </Box>

            <ul>
              <div style={divStyle}>
                {state.task
                  ? state.task.map(
                      (item: {
                        content: string;
                        category: string;
                        id: string;
                        isEditing: boolean;
                        isChecked: boolean;
                      }) => {
                        const { content, category, id, isEditing, isChecked } =
                          item;
                        if (category === board) {
                          return (
                            <div>
                              <dl>
                                {isEditing ? (
                                  <>
                                    <form
                                      onSubmit={(e) => {
                                        e.preventDefault();
                                        editDone({ id: id, content: value });
                                      }}
                                    >
                                      <TextField
                                        value={value}
                                        variant="standard"
                                        label={t("tasks.editTask")}
                                        onChange={(e) =>
                                          setValue(e.target.value)
                                        }
                                      />

                                      <a>
                                        <img
                                          src={doneLogo}
                                          alt={t("tasks.done")}
                                          style={{
                                            height: "30px",
                                            width: "30px",
                                            marginTop: "20px",
                                            paddingRight: 5,
                                            paddingLeft: 5,
                                          }}
                                          onClick={() => {
                                            editDone({
                                              id: id,
                                              content: value,
                                            });
                                          }}
                                        />
                                      </a>
                                    </form>
                                  </>
                                ) : (
                                  <>
                                    <div className="d-flex">
                                      <input
                                        type="checkbox"
                                        checked={isChecked && true}
                                        onClick={() =>
                                          handleCheck({
                                            status: !isChecked,
                                            id: id,
                                          })
                                        }
                                        style={{
                                          marginBottom: 15,
                                          paddingLeft: 2,
                                          paddingRight: 2,
                                        }}
                                      />
                                      <p
                                        style={{
                                          textDecoration: isChecked
                                            ? "line-through"
                                            : "",
                                          letterSpacing: "1px",
                                          color: isChecked ? "red" : "black",
                                          fontFamily: "OCR A Std, monospace",
                                          fontStyle: isChecked
                                            ? "italic"
                                            : "normal",
                                          fontWeight: isChecked
                                            ? "normal"
                                            : "bold",
                                        }}
                                      >
                                        {content}
                                      </p>

                                      <a>
                                        <img
                                          src={editLogo}
                                          alt={t("tasks.edit")}
                                          style={{
                                            height: "15px",
                                            width: "20px",
                                          }}
                                          onClick={() => {
                                            edit(id);
                                            setValue(content);
                                          }}
                                        />
                                      </a>

                                      <a>
                                        <img
                                          src={removeLogo}
                                          alt={t("tasks.remove")}
                                          style={{
                                            height: "15px",
                                            width: "20px",
                                          }}
                                          onClick={() => remove(id)}
                                        />
                                      </a>
                                      {state.boards.length > 1 && (
                                        <>
                                          <FormControl
                                            variant="filled"
                                            sx={{
                                              minWidth: 100,
                                            }}
                                          >
                                            <InputLabel
                                              id={id}
                                              sx={{ fontSize: "small" }}
                                            >
                                              {category}
                                            </InputLabel>
                                            <Select
                                              id={id}
                                              value={category}
                                              sx={{
                                                maxHeight: "20px",
                                                marginTop: "5px",
                                              }}
                                            >
                                              {state.boards.map(
                                                (item: { title: string }) => {
                                                  return (
                                                    <>
                                                      <MenuItem
                                                        onClick={() =>
                                                          changePlace({
                                                            id: id,
                                                            type: item.title,
                                                          })
                                                        }
                                                        value={item.title}
                                                      >
                                                        {item.title}
                                                      </MenuItem>
                                                    </>
                                                  );
                                                }
                                              )}
                                            </Select>
                                          </FormControl>
                                        </>
                                      )}
                                    </div>
                                  </>
                                )}
                              </dl>
                            </div>
                          );
                        }
                      }
                    )
                  : ""}
              </div>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
};
