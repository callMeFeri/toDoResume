import { useGlobalContext } from "../../context/context-state";
import { useTranslation } from "react-i18next";
import { TaskForm } from "./forms/taskForm";
export const ToDo = () => {
  const { state, addBoard } = useGlobalContext();
  const { t } = useTranslation();

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="m-sm-4">
            <form
              onSubmit={(e) => {
                addBoard(e.target.board.value);
                e.preventDefault();
              }}
            >
              <div className="mb-3">
                <label className="form-label">{t("tasks.taskLabel")}</label>
                <input
                  className={`form-control form-control-lg `}
                  placeholder={t("tasks.placeHolder")}
                  name="board"
                />
              </div>

              <div className="text-center mt-3">
                <button type="submit" className="btn btn-lg btn-primary">
                  {t("tasks.addTask")}
                </button>
              </div>
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
