import { useGlobalContext } from "../../../context/context-state";
import { useTranslation } from "react-i18next";
import { CSSProperties, useRef } from "react";
import { useState } from "react";
import editLogo from "../../../assets/images/edit+options+pen+pencil+tool+write+icon-1320162308955248227.svg";
import doneLogo from "../../../assets/images/checkmark+circle+complete+done+filled+ok+icon-1320184293398883601.svg";
import removeLogo from "../../../assets/images/remove+circle+24px-131985190467137446.svg";

// type Sub = {
//   content: {
//     e: {
//       target: {
//         task: {
//           value: string;
//         };
//       };
//     };
//     category: string;
//   };
// };
export const TaskForm = ({ board, idBoard }) => {
  const { state, addTask, edit, editDone, remove, removeBoard, changePlace } =
    useGlobalContext();
  const { t } = useTranslation();
  const ref = useRef(null);
  const [value, setValue] = useState("");
  const divStyle: CSSProperties = {
    border: "solid",
    borderRadius: "5px",
    borderColor: "silver",
    padding: 5,
    // backgroundImage:""
    backgroundImage:
      "linear-gradient(to right, rgba(255,0,0,0), rgba(192,192,192))",
  };
  return (
    <div className="card">
      <div className="card-body">
        <div className="m-sm-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addTask({
                content: e.target.task.value,
                category: board,
              });
              ref.current.value = "";
            }}
          >
            <div className="mb-3">
              <label className="form-label">{t("tasks.taskLabel")}</label>
              <input
                className={`form-control form-control-lg `}
                name="task"
                ref={ref}
              />
            </div>

            <div className="text-center mt-3">
              <button type="submit" className="btn btn-lg btn-primary">
                {t("tasks.addTask")}
              </button>
              <br />
              <button
                type="button"
                style={{ backgroundColor: "red ", width: "200px" }}
                className="btn btn-lg  "
                onClick={() => removeBoard(idBoard)}
              >
                {t("tasks.remove")}
              </button>
            </div>
            <ul>
              {state.task
                ? state.task.map(
                    (item: {
                      content: string;
                      category: string;
                      id: string;
                      isEditing: boolean;
                    }) => {
                      const { content, category, id, isEditing } = item;
                      if (category === board) {
                        return (
                          <div style={divStyle}>
                            <li>
                              {isEditing ? (
                                <>
                                  <form
                                    onSubmit={(e) => {
                                      e.preventDefault();
                                      editDone({ id: id, content: value });
                                    }}
                                  >
                                    <input
                                      type="text"
                                      value={value}
                                      onChange={(e) => setValue(e.target.value)}
                                      className={`form-control form-control-lg `}
                                    />
                                    <a>
                                      <img
                                        src={doneLogo}
                                        alt={t("tasks.done")}
                                        style={{
                                          height: "20px",
                                          width: "20px",
                                        }}
                                        onClick={() => {
                                          editDone({ id: id, content: value });
                                        }}
                                      />
                                    </a>
                                  </form>
                                </>
                              ) : (
                                <>
                                  <div className="d-flex">
                                    <input type="checkbox" />
                                    <p>{content}</p>

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
                                  </div>

                                  {state.boards.length > 1 ? (
                                    <select
                                      style={{ height: "20px" }}
                                      value={board}
                                      onChange={(e) =>
                                        changePlace({
                                          id: id,
                                          type: e.target.value,
                                        })
                                      }
                                    >
                                      {state.boards.map(
                                        (item: { title: string }) => {
                                          return <option>{item.title}</option>;
                                        }
                                      )}
                                    </select>
                                  ) : (
                                    ""
                                  )}
                                </>
                              )}
                            </li>
                          </div>
                        );
                      }
                    }
                  )
                : ""}
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
};
